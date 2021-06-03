from core import get_data
from core import process_data
from flask import Flask, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/analizar", methods=['POST'])
def analizar():
    # TODO: mudar para metodo get e passar query strings
    parametros = request.json
    get_data.get_csv_tweets(parametros)
    return process_data.processar_dados(parametros['termo'])


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=False)