from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "secret_key"
app.config['UPLOAD_FOLDER'] = 'upload' 

db = SQLAlchemy(app)

migrate = Migrate(app, db)
from app import routes
