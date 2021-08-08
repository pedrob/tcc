import pandas as pd
import json
import os
# from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from googletrans import Translator

def converter_data(data):
    nova_data = data.split("-")
    nova_data.pop()
    nova_data.reverse()
    nova_data = "/".join(nova_data)
    return nova_data

def adicionar_valor_analise_de_sentimentos(neutro, pos, neg, res):
    res['mencoesNeutras'].append(neutro)
    res['mencoesPositivas'].append(pos)
    res['mencoesNegativas'].append(neg)

def processar_dados(termo):
    df = pd.read_csv('tweets.csv', encoding='utf-8')
    df.drop_duplicates(['text'], inplace=True)
    index = df.index
    total = len(index)

    resposta = {
        'termo': termo,
        'mencoes': [],
        'mencoesPositivas': [],
        'mencoesNegativas': [],
        'mencoesNeutras': [],
        'datas': [],
        'tweetsPositivos': [],
        'tweetsNegativos': [],
        'total': total
    }

    analisador = SentimentIntensityAnalyzer()
    tradutor = Translator()
    for conteudo_texto, data in zip(df.text, df.date):
        data_ref = converter_data(data)
        traducao = tradutor.translate(conteudo_texto, dest='en').text
        analise = analisador.polarity_scores(traducao)
        if data_ref in resposta['datas']:
            if analise['compound'] >= 0.1:
                resposta['mencoesPositivas'][-1] += 1
                if len(resposta['tweetsPositivos']) < 10:
                    resposta['tweetsPositivos'].append(conteudo_texto)
            elif analise['compound'] > -0.1 and analise['compound'] < 0.1:
                resposta['mencoesNeutras'][-1] += 1
            else:
                resposta['mencoesNegativas'][-1] += 1
                if len(resposta['tweetsNegativos']) < 10:
                    resposta['tweetsNegativos'].append(conteudo_texto)
            resposta['mencoes'][-1] += 1
        else:
            if analise['compound'] >= 0.1:
                adicionar_valor_analise_de_sentimentos(0, 1, 0, resposta)
            elif analise['compound'] > -0.1 and analise['compound'] < 0.1:
                adicionar_valor_analise_de_sentimentos(1, 0, 0, resposta)
            else:
                adicionar_valor_analise_de_sentimentos(0, 0, 1, resposta)

            resposta['mencoes'].append(1)
            resposta['datas'].append(data_ref)

    resposta['mencoes'].reverse()
    resposta['mencoesNeutras'].reverse()
    resposta['mencoesPositivas'].reverse()
    resposta['mencoesNegativas'].reverse()
    resposta['datas'].reverse()
    # os.remove('tweets.csv')
    return json.dumps(resposta)

