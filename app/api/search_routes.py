from flask import Blueprint
import requests
from app.config import Config
import urllib.parse

search_routes = Blueprint('search', __name__)


@search_routes.route('/<query>')
def get_search_result(query):
    '''
    This is route is a general query without additional parameters
    '''
    encoded_query = urllib.parse.quote_plus(query)
    payload = {'q': encoded_query,
               'apiKey': Config.NEWS_KEY, 'pageSize': '100'}
    response = requests.get(
        f'https://newsapi.org/v2/everything?', params=payload)

    data = response.json()

    return data


@search_routes.route('/title/<query>/<language>')
def get_search_result_by_title(query, language):
    '''
    This is route is a general query by title.
    '''
    encoded_query = urllib.parse.quote_plus(query)
    # encoded_language = urllib.parse.quote_plus(language)
    # encoded_country = urllib.parse.quote_plus(country)
    payload = {'qInTitle': encoded_query, 'apiKey': Config.NEWS_KEY,
               'language': language, 'pageSize': '100'}
    response = requests.get(
        f'https://newsapi.org/v2/everything?', params=payload)
    data = response.json()

    return data


# @search_routes.route('/category/<query>')
# def get_search_result_by_category(category):
#     '''
#     This is route is a general query by category.
#     '''
#     encoded_category = urllib.parse.quote_plus(category)
#     payload = {'category': encoded_category,
#                'apiKey': Config.NEWS_KEY, 'pageSize': '100'}
#     response = requests.get(
#         f'https://newsapi.org/v2/everything?', params=payload)
#     data = response.json()

#     return data


@search_routes.route('/top-headlines/<country>/<category>')
def get_top_headlines(country, category):
    '''
    This is route returns top headlines in the United States by default.

    '''
    payload = {'country': country, 'category': category,
                'apiKey': Config.NEWS_KEY, 'pageSize': '100'}

    response = requests.get(
        f'https://newsapi.org/v2/top-headlines?', params=payload)
    data = response.json()

    return data
