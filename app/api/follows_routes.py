from flask import Blueprint
from flask_login import login_required, current_user
from app.models import FollowedTopics

follows_routes = Blueprint('follows', __name__)


@follows_routes.route('/', methods=['POST'])
# @login_required
def post_user_follows():
    '''
    associate topic to user in database
    '''
    topic = FollowedTopics()
    return


@follows_routes.route('/',methods=['GET'])
# @login_required
def get_user_follows():
    '''
    get topics to associated with user
    '''
    topics = FollowedTopics.query.filter_by(userId=f'{current_user.id}').all()
    topicsList = {topic.to_dict()['id']: topic.to_dict() for topic in topics}

    return topicsList

@follows_routes.route('/:followId')
# @login_required
def get_one_user_follow(followId):
    '''
    get specific topic associated with user
    '''
    return


@follows_routes.route('/:followId')
# @login_required
def delete_user_follow():
    '''
    get topics to associated with user
    '''
    return
