from .db import db
from datetime import datetime


class SavedArticle(db.Model):
    __tablename__ = 'Saved Article'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    source = db.Column(db.String(255))
    description = db.Column(db.Text)
    url = db.Column(db.Text, nullable=False)
    urlToImage = db.Column(db.Text)
    publishedAt = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref(
        "article", cascade="all, delete-orphan"), uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'source': self.source,
            'description': self.description,
            'url': self.url,
            'urlToImage': self.urlToImage,
            'publishedAt': self.publishedAt,

        }
