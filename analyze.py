from nltk import word_tokenize
import nltk
import re
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn import svm
from sklearn import metrics
from sklearn.model_selection import cross_val_predict
from nltk.tokenize import TweetTokenizer
import spacy

df = pd.read_csv('tweets.csv', encoding='utf-8')
print(df.text.count())
df.drop_duplicates(['text'], inplace=True)
print(df.text.count())
nlp = spacy.load('pt_core_news_sm')
count = 10
for row in df.text:
    count += 1
    texto = nlp(row)
    for entidade in texto.ents:
        print(entidade.text, entidade.label_)
    if count == 2:
        break
# Preciso filtrar os tweets que só possuem entidade nomeada (nome do candidato)
# e a o token presidente 2022

# Após isso, preciso calcular os nomes mais frequentes, depois filtrar os
# tweets que possuem esse nome

# depois preciso classificar cada um desses tweets filtrados com uma analise 
# de sentimentos

# Concluo com o candidato com mais referencias positivas e a tendencia ou nao de crescimento

# Graficos: nuvem de palavras, barra, linha por tempo (para ilustrar a tendencia)

