import json
from core import scrapper
from core import analyzer
from cache import redis
from utils import hash
from flask import Flask, request
from flask_cors import CORS
from datetime import timedelta


app = Flask(__name__)
CORS(app)


@app.route("/analyze", methods=['POST'])
def analyze():
    redis_client = redis.connect()
    params = request.json
    cache_key = hash.create_hash(params)
    cache_response = redis_client.get(cache_key)
    if cache_response:
        return cache_response

    scrapper.get_tweets_csv(params)
    response = analyzer.process_data(params['term'])
    redis_client.setex(cache_key, timedelta(days=1), value=response, )
    return response


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)