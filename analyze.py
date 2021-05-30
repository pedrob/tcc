import pandas as pd
# import spacy
import json

# def orderAsc(pessoa):
#     pessoa['mencoes'].reverse()
#     pessoa['datas'].reverse()
#     return pessoa

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

df = pd.read_csv('tweets.csv', encoding='utf-8')
df.drop_duplicates(['text'], inplace=True)
index = df.index
total = len(index)

# modelo menor
# nlp = spacy.load('pt_core_news_sm')
# nlp = spacy.load('pt_core_news_lg')


resposta = {
    'termo': 'Lula Presidente 2022',
    'mencoes': [],
    'mencoesPositivas': [],
    'mencoesNegativas': [],
    'mencoesNeutras': [],
    'datas': [],
    "total": total
}

for conteudo_texto, data, mencoes_neutras, polaridade in zip(df.text, df.date, df.neu_w, df.polarity):
    data_ref = converter_data(data)
    if data_ref in resposta['datas']:
        if mencoes_neutras == 1:
            resposta['mencoesNeutras'][-1] += 1
        else:
            if polaridade > 0:
                resposta['mencoesPositivas'][-1] += 1
            else:
                resposta['mencoesNegativas'][-1] += 1
        resposta['mencoes'][-1] += 1
    else:
        if mencoes_neutras == 1:
            adicionar_valor_analise_de_sentimentos(1, 0, 0, resposta)
        else:
            if polaridade > 0:
                adicionar_valor_analise_de_sentimentos(0, 1, 0, resposta)
            else:
                adicionar_valor_analise_de_sentimentos(0, 0, 1, resposta)
        resposta['mencoes'].append(1)
        resposta['datas'].append(data_ref)

resposta['mencoes'].reverse()
resposta['mencoesNeutras'].reverse()
resposta['mencoesPositivas'].reverse()
resposta['mencoesNegativas'].reverse()
resposta['datas'].reverse()
print(json.dumps(resposta))

