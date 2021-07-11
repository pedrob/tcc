import json
from core import get_data
from core import process_data
from cache import redis_client
from utils import create_hash
from flask import Flask, request
from flask_cors import CORS
from datetime import timedelta


app = Flask(__name__)
CORS(app)


@app.route("/analizar", methods=['POST'])
def analizar():
    # TODO: mudar para metodo get e passar query strings
    cliente_redis = redis_client.redis_connect()
    parametros = request.json
    chave_cache = create_hash.criarHash(parametros)
    resposta_do_cache = cliente_redis.get(chave_cache)
    if resposta_do_cache is not None:
        return resposta_do_cache

    get_data.get_csv_tweets(parametros)
    resposta = process_data.processar_dados(parametros['termo'])
    cliente_redis.setex(chave_cache, timedelta(days=1), value=resposta, )
    return resposta


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)