from bsi_sentiment.twitter import search_tweets_sn

def get_csv_tweets(parametros):
  # TODO: lidar com excessoes
  tweets = search_tweets_sn(
    q=parametros['termo'],
    since=parametros['dataInicio'],
    until=parametros['dataFim'],
    near=parametros['pais'],
    lang=parametros['linguagem'],
    max_tweets=parametros['qtdMax']
  )
  tweets.get_sentiment(method=parametros["metodoAnalise"])
  tweets.to_csv("./tweets.csv")

# tweets = search_tweets_sn(
#   q="Lula Presidente 2022",
#   since="2019-01-01",
#   until="2021-05-01",
#   near="Brasil",
#   lang="pt-br",
#   max_tweets=10000
# )

