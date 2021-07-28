from flask import Blueprint
from app.models import db, User
import requests
import os
import urllib.parse

search_routes = Blueprint('search', __name__)


@search_routes.route('/<query>')
def get_search_result(query):
    '''
    This is route is a general query without additional parameters
    '''
    encoded_query = urllib.parse.quote_plus(query)
    payload = {'q':encoded_query, 'apiKey': os.environ.get("NEWS_KEY")}
    response = requests.get(
        f'https://newsapi.org/v2/everything?',params=payload)

    data = response.json()

    return data


@search_routes.route('/title/<query>')
def get_search_result_by_title(query):
    '''
    This is route is a general query without additional parameters
    '''
    encoded_query = urllib.parse.quote_plus('query')
    response = requests.get(f'https://newsapi.org/v2/everything?qInTitle={encoded_query}&apiKey={os.environ.get("NEWS_KEY")}')
    data = response.json()

    return data

@search_routes.route('/top-headlines/<country>')
def get_top_headlines(country):
    '''
    This is route returns top headlines in the United States by default.

    '''
    if country is None:
        response = requests.get(f'https://newsapi.org/v2/top-headlines?country=us&apiKey={os.environ.get("NEWS_KEY")}')
        data = response.json()

        return data
    else:
        response = requests.get(f'https://newsapi.org/v2/top-headlines?country={country}&apiKey={os.environ.get("NEWS_KEY")}')
        data = response.json()

        return data
