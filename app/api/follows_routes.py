from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, FollowedTopics

follows_routes = Blueprint('follows', __name__)


@follows_routes.route('/', methods=['POST'])
def post_user_follows():
    '''
    associate topic to user in database
    '''
    topicString = request.form.get('topicString')
    newTopic = FollowedTopics(userId=current_user.id, topicString=topicString)
    db.session.add(newTopic)
    db.session.commit()
    return {'message': f'{topicString} POST successful'}


@follows_routes.route('/', methods=['GET'])
def get_user_follows():
    '''
    get topics to associated with user
    '''
    topics = FollowedTopics.query.filter_by(userId=f'{current_user.id}').all()
    topicsList = {topic.to_dict()['id']: topic.to_dict() for topic in topics}
    if topicsList is None:
        return {'errors': ['Unsuccessful']}, 404
    return topicsList


@follows_routes.route('/<int:followId>', methods=['GET'])
def get_one_user_follow(followId):
    '''
    get specific topic associated with user
    '''
    topic = FollowedTopics.query.filter_by(id=followId,userId=f'{current_user.id}').first()
    if topic is None:
        return {'errors': ['Unsuccessful']}, 404
    return topic.to_dict()


@follows_routes.route('/<int:followId>', methods=['DELETE'])
def delete_user_follow(followId):
    '''
    delete specific topics associated with user
    '''
    topic = FollowedTopics.query.filter_by(id=followId,userId=f'{current_user.id}').first()
    if topic is None:
        return {'errors': ['Unsuccessful']}, 404
    else:
        db.session.delete(topic)
        db.session.commit()
        return {'message': 'Successfully deleted'}, 200
