from flask import Blueprint
from flask_login import login_required
from app.models import SavedArticle

saved_article_routes = Blueprint('saved_article', __name__)


@saved_article_routes.route('/', methods=['POST'])
def post_user_articles():
    '''
    associate article to user in database
    '''
    # topic = FollowedTopics()
    return


@saved_article_routes.route('/', methods=['GET'])
def get_user_articles():
    '''
    get articles to associated with user
    '''
    # topics = FollowedTopics.query.filter_by(userId=f'{current_user.id}').all()
    # topicsList = {topic.to_dict()['id']: topic.to_dict() for topic in topics}

    # return topicsList


@saved_article_routes.route('/:articleId')
def get_one_user_article(articleId):
    '''
    get specific article associated with user
    '''
    return


@saved_article_routes.route('/:articleId')
def delete_user_article():
    '''
    delete specific article associated with user
    '''
    return
