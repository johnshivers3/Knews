from flask import Blueprint, request
from flask_login import current_user
from app.models import db, SavedArticle

saved_article_routes = Blueprint('saved_article', __name__)


@saved_article_routes.route('/', methods=['POST'])
def post_user_articles():
    '''
    associate article to user in database
    '''
    article = request.json
    newArticle = SavedArticle(userId=current_user.id)
    db.session.add(newArticle)
    db.session.commit()
    return {'message': f'{article} POST successful'}, 200


@saved_article_routes.route('/', methods=['GET'])
def get_user_articles():
    '''
    get articles to associated with user
    '''
    articles = SavedArticle.query.filter_by(userId=f'{current_user.id}').all()
    articlesList = {article.to_dict()['id']: article.to_dict() for article in articles}
    if articlesList is None:
        return {'errors': ['Unsuccessful']}, 404
    return articlesList


@saved_article_routes.route('/<int:articleId>')
def get_one_user_article(articleId):
    '''
    get specific article associated with user
    '''
    article = SavedArticle.query.filter_by(
        id=articleId, userId=f'{current_user.id}').first()
    if article is None:
        return {'errors': ['Unsuccessful']}, 404
    return article.to_dict()


@saved_article_routes.route('/<int:articleId>')
def delete_user_article(articleId):
    '''
    delete specific article associated with user
    '''
    article = SavedArticle.query.filter_by(
        id=articleId, userId=f'{current_user.id}').first()
    if article is None:
        return {'errors': ['Unsuccessful']}, 404
    else:
        db.session.delete(article)
        db.session.commit()
        return {'message': 'Successfully deleted'}, 200
