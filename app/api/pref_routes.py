from flask import Blueprint
# from flask_login import login_required
from app.models import UserPreferences

pref_routes = Blueprint('pref', __name__)


@pref_routes.route('/', methods=['POST'])
def post_user_prefs():
    '''
    associate preferences to user in database
    '''
    # topic = prefedTopics()
    return


@pref_routes.route('/', methods=['GET'])
def get_user_prefs():
    '''
    get preferences to associated with user
    '''
    # topics = prefedTopics.query.filter_by(userId=f'{current_user.id}').all()
    # topicsList = {topic.to_dict()['id']: topic.to_dict() for topic in topics}

    # return topicsList


@pref_routes.route('/:prefId')
def delete_user_pref():
    '''
    get preferences associated with user
    '''
    return
