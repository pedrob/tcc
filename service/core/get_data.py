from bsi_sentiment.twitter import search_tweets_sn

def get_csv_tweets(parametros):
  # TODO: lidar com excessoes
  tweets = search_tweets_sn(
    q=parametros['termo'],
    since=parametros['dataInicio'],
    until=parametros['dataFim'],
    near="Brasil",
    lang="pt-br",
    max_tweets=parametros['qtdMax']
  )
  # tweets.get_sentiment(method="vader")
  tweets.to_csv("./tweets.csv")

