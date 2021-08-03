from flask import Blueprint, request
from flask_login import current_user
from app.models import db, UserPreferences

pref_routes = Blueprint('pref', __name__)


@pref_routes.route('/', methods=['PATCH'])
def patch_user_prefs():
    '''
    update preferences associated with user in database
    '''
    currentPreferences = UserPreferences.query.filter_by(
        userId=current_user.id)
    updated = request.json['preferences']
    updated['userId'] = current_user.id
    currentPreferences.update(updated)
    db.session.commit()
    return {'message': 'Successful'}


@pref_routes.route('/', methods=['GET'])
def get_user_prefs():
    '''
    get preferences to associated with user
    '''
    preferences = UserPreferences.query.filter_by(
        userId=f'{current_user.id}').first()
    print(preferences)

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
