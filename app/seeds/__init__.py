from flask.cli import AppGroup
from .users import seed_users, undo_users
from .saved_articles import seed_saved_articles, undo_saved_articles
from .followed_topics import seed_followed_topics, undo_followed_topics
from .user_preferences import seed_user_preferences, undo_user_preferences

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_saved_articles()
    seed_followed_topics()
    seed_user_preferences()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_saved_articles()
    undo_followed_topics()
    undo_user_preferences()

    # Add other undo functions here
