from app.models.user import User
from flask import Blueprint
from flask_login import current_user
from app.models import db,UserPreferences

pref_routes = Blueprint('pref', __name__)


@pref_routes.route('/', methods=['POST'])
def post_user_prefs():
    '''
    associate preferences to user in database
    '''
    # topic = UserPreferences()
    return


@pref_routes.route('/', methods=['GET'])
def get_user_prefs():
    '''
    get preferences to associated with user
    '''
    preferences = UserPreferences.query.filter_by(
        userId=f'{current_user.id}').first()

    return preferences.to_dict()


@pref_routes.route('/', methods=['DELETE'])
def delete_user_pref():
    '''
    delete preferences associated with user
    '''
    preferences = UserPreferences.query.filter_by(
        userId=f'{current_user.id}').first()
    if preferences is None:
        return {'errors': ['Unsuccessful']}, 404
    else:
        db.session.delete(preferences)
        db.session.commit()
        return {'message': 'Successfully deleted'}
