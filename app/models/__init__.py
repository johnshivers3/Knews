from .db import db
from .user import User
from .blocked_terms import BlockedTerms
from .followed_topics import FollowedTopics
from .saved_article import SavedArticle
from .user_preferences import UserPreferences
from flask.cli import AppGroup


# Creates a table group to hold our commands
# So we can type `flask table --help`
table_commands = AppGroup('table')

@table_commands.command('dropall')
def drop():
    db.drop_all()
