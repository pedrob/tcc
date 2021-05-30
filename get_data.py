from bsi_sentiment.twitter import search_tweets_sn

# parametrizar os valores
tweets = search_tweets_sn(
  q="Lula Presidente 2022",
  since="2019-01-01",
  until="2021-05-01",
  near="Brasil",
  lang="pt-br",
  max_tweets=10000
)

tweets.get_sentiment(method="vader")
tweets.to_csv("./tweets-new-vader.csv")