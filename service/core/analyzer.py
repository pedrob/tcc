import os
import pandas as pd
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def parse_date(date):
    new_date = date.split("-")
    new_date.pop()
    new_date.reverse()
    new_date = "/".join(new_date)
    return new_date

def add_sentiment_analysis_value(neutral, pos, neg, res):
    res['neutralMentions'].append(neutral)
    res['positiveMentions'].append(pos)
    res['negativeMentions'].append(neg)

def add_tweets(res, content, date, key):
    tweets_list = res[key].get(date, None)
    if tweets_list != None:
        res[key][date].append(content)
    else:
        res[key][date] = [content]

def process_data(term):
    df = pd.read_csv('tweets.csv', encoding='utf-8')
    df.drop_duplicates(['text'], inplace=True)
    index = df.index
    total = len(index)

    response = {
        'term': term,
        'mentions': [],
        'positiveMentions': [],
        'negativeMentions': [],
        'neutralMentions': [],
        'dates': [],
        'positiveTweets': {},
        'negativeTweets': {},
        'total': total
    }

    analyzer = SentimentIntensityAnalyzer()
    for text_content, date in zip(df.text, df.date):
        date_ref = parse_date(date)
        scores = analyzer.polarity_scores(text_content)
        if date_ref in response['dates']:
            if scores['compound'] >= 0.1:
                response['positiveMentions'][-1] += 1
                add_tweets(response,text_content,date_ref,'positiveTweets')
            elif scores['compound'] > -0.1 and scores['compound'] < 0.1:
                response['neutralMentions'][-1] += 1
            else:
                response['negativeMentions'][-1] += 1
                add_tweets(response,text_content,date_ref,'negativeTweets')
            response['mentions'][-1] += 1
        else:
            if scores['compound'] >= 0.1:
                add_sentiment_analysis_value(0, 1, 0, response)
                add_tweets(response,text_content,date_ref,'positiveTweets')
            elif scores['compound'] > -0.1 and scores['compound'] < 0.1:
                add_sentiment_analysis_value(1, 0, 0, response)
            else:
                add_sentiment_analysis_value(0, 0, 1, response)
                add_tweets(response,text_content,date_ref,'negativeTweets')

            response['mentions'].append(1)
            response['dates'].append(date_ref)

    response['mentions'].reverse()
    response['neutralMentions'].reverse()
    response['positiveMentions'].reverse()
    response['negativeMentions'].reverse()
    response['dates'].reverse()
    
    os.remove('tweets.csv')
    
    return json.dumps(response)

