from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime
import random
import string
from PIL import Image
from difflib import SequenceMatcher

import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '../data/media/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def generate_unique_filename(existing_filenames, original_filename):
    filename, extension = os.path.splitext(original_filename)
    while True:
        new_filename = str(uuid.uuid4())[:8] + extension
        if new_filename not in existing_filenames:
            return new_filename


@app.route('/submit', methods=['POST'])
def submit_form():

    # Get form data
    data = request.form

    # Convert form data to dictionary
    form_data = {key: value for key, value in data.items()}

    # Save photo to uploads directory
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':

            original_filename = file.filename

            existing_filenames = os.listdir(UPLOAD_FOLDER)
            new_filename = generate_unique_filename(
                existing_filenames, original_filename)
            file_path = os.path.join(UPLOAD_FOLDER, new_filename)

            file.save(file_path)

            filename = new_filename

            form_data['file_path'] = file_path
            # form_data['file_size'] = os.path.getsize(file_path)
            form_data['extension'] = os.path.splitext(filename)[1][1:]
            form_data['dimensions'] = datetime.now().isoformat()
            with Image.open(file_path) as img:
                width, height = img.size
                form_data['image_size'] = {"height": height, "width": width}
            if 'tags' in request.form:
                tags_string = request.form['tags']
                tags_list = [tag.strip() for tag in tags_string.split(',')]
                form_data['tags'] = tags_list

    json_file_path = '../data/meta.json'

    if os.path.exists(json_file_path):

        try:
            with open(json_file_path, 'r') as file:
                data = json.load(file)

                if "images" not in data.keys():
                    data["images"] = []
        except Exception as e:
            print(e)

            data = {}
            data["images"] = []
    else:

        data = {}
        data["images"] = []

    data["images"].append(form_data)

    with open(json_file_path, 'w') as f:
        json.dump(data, f, indent=4)

    return jsonify({'message': 'Submission successful.'})


@app.route('/search', methods=['GET'])
def search():
    search_string = request.args.get('query', '').lower()

    # Debugging: Log the value of query
    print("Query:", search_string)

    with open('../data/meta.json', 'r') as f:
        meta_data = json.load(f)

    # print(meta_data)

    print("DEBUG1")

    best_match = None
    best_score = 0

    print("DEBUG2")

    for image in meta_data['images']:
        # Calculate similarity score based on title and description
        title_score = SequenceMatcher(
            None, search_string.lower(), image['title'].lower()).ratio()
        description_score = SequenceMatcher(
            None, search_string.lower(), image.get('description', '').lower()).ratio()
        # Taking average of title and description scores
        total_score = (title_score + description_score) / 2

        if total_score > best_score:
            best_score = total_score
            best_match = image

    return jsonify(best_match)


if __name__ == '__main__':
    app.run(port=5000)
