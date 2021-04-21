from bsi_sentiment.twitter import search_tweets_sn

tweets = search_tweets_sn(
  q="Presidente 2022",
  since="2019-01-01",
  until="2021-03-01",
  near="Brasil",
  lang="pt-br"
)

# tweets.get_sentiment(method="vader")
tweets.to_csv("./tweets.csv")