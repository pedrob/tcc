import spacy

nlp = spacy.load('pt_core_news_sm')
texto = nlp('E Bolsonaro, ñ chegaria nem ao 2º turno, seria só o medíocre de sempre https://t.co/ixJM7m1K7a",2021-02-28')

# for token in texto:
#     print(token, token.idx, token.shape_, token.tag_)

for entidade in texto.ents:
    print(entidade.text, entidade.label_)