from flask import Blueprint
from app.models import db, User
import requests
import os
search_routes = Blueprint('search', __name__)

@search_routes.route('/top-headlines')
def get_top_headlines():
    response = requests.get(f'https://newsapi.org/v2/top-headlines?country=us&apiKey={os.environ.get("NEWS_KEY")}')
    print(response)
