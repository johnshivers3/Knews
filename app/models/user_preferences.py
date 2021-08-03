from .db import db
from datetime import datetime


class UserPreferences(db.Model):
    __tablename__ = 'User Preferences'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    lang = db.Column(db.String(255))
    country = db.Column(db.String(255))
    defaultFeed = db.Column(db.Text)
    theme = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref(
        "preferences", cascade="all, delete-orphan"), uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'lang': self.lang,
            'country': self.country,
            'defaultFeed': self.defaultFeed,
            'theme': self.theme

        }
