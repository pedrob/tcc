from bsi_sentiment.twitter import search_tweets_sn

def get_tweets_csv(params):
  tweets = search_tweets_sn(
    q=params['term'],
    since=params['startDate'],
    until=params['endDate'],
    max_tweets=params['qtdMax']
  )
  tweets.to_csv("./tweets.csv")

