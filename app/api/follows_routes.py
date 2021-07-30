from flask import Blueprint
from flask_login import login_required
from app.models import FollowedTopics

follows_routes = Blueprint('follows', __name__)


@follows_routes.route('/:userId')
@login_required
def post_user_follows(userId):
    '''
    associate topic to user in database
    '''
    topics = FollowedTopics.query
    return


@follows_routes.route('/:userId')
@login_required
def get_user_follows(userId):
    '''
    get topics to associated with user
    '''

    return


@follows_routes.route('/:userId')
@login_required
def get_one_user_follow(userId):
    '''
    get specific topic associated with user
    '''
    return


@follows_routes.route('/:userId')
@login_required
def delete_user_follow(userId):
    '''
    get topics to associated with user
    '''
    return
