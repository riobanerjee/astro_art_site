from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import json
from datetime import datetime
import random
import string
from PIL import Image

import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def generate_unique_filename(existing_filenames, original_filename):
    filename, extension = os.path.splitext(original_filename)
    while True:
        # Generate a random filename with the same extension
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
        print("file", file.filename)
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
    else:
        print("No file.")

    json_file_path = 'data.json'

    if os.path.exists(json_file_path):

        try:
            with open(json_file_path, 'r') as file:
                data = json.load(file)
                print("AAA")
                print(data.keys())
                print("AAA")

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

    return jsonify({'message': 'Form submitted successfully'})


if __name__ == '__main__':
    app.run(debug=True)
