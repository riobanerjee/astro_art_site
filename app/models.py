from app import db

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    filename = db.Column(db.String(100), nullable=False)
    tags = db.Column(db.String(100), nullable=False)
    full_image_url = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f"Image('{self.title}', '{self.filename}', '{self.tags}', '{self.full_image_url}')"
