import os
from flask import request, redirect, url_for, flash, render_template
from app import app, db
from app.models import Image
from werkzeug.utils import secure_filename
from flask import jsonify
import json


UPLOAD_FOLDER = 'static/upload' 
print(UPLOAD_FOLDER)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            if filename:
                file_path = os.path.join(app.root_path, UPLOAD_FOLDER, filename)
                file.save(file_path)
                title = request.form['title']
                tags = request.form['tags']
                full_image_url = url_for('static', filename='upload/' + filename, _external=True)
                image = Image(title=title, filename=filename, tags=tags, full_image_url=full_image_url)
                db.session.add(image)
                db.session.commit()
                flash('File successfully uploaded')
                return redirect(url_for('index'))
            else:
                flash('Filename not provided')
        else:
            flash('No file selected')
    return render_template('upload.html')



@app.route('/search', methods=['POST'])
def search():
    # if request.method == 'POST':
    query = request.form['query']
    search_results = []

    # Fetch images from the database based on the search query
    images = Image.query.filter(Image.title.like(f'%{query}%') | Image.tags.like(f'%{query}%')).all()

    # Construct full image URLs
    for image in images:
        full_image_url = url_for('static', filename='upload/' + image.filename, _external=True)
        search_results.append({'full_image_url': full_image_url, 'title': image.title, 'tags': image.tags})

    return jsonify({'query': query, 'search_results': search_results})
