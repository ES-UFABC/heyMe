import random
import json
import pickle
import numpy as np

import nltk, os
from nltk.stem import WordNetLemmatizer

from tensorflow.keras.models import load_model

#do the training every time, comment to disable
#needed on deploy
import training

lemmatizer = WordNetLemmatizer()
# intents = json.loads(open('intents.json').read())

path = os.path.dirname(__file__)

with open(f"{path}/intents.json", encoding='utf-8') as arq_json:
    intents = json.load(arq_json)

words = pickle.load(open(f'{path}/words.pkl', 'rb'))
classes = pickle.load(open(f'{path}/classes.pkl', 'rb'))
model = load_model(f'{path}/chatbot_model.h5')

# This is for cleaning up the sentence

def clean_up_sentence(sentence):
    sentence = sentence.lower()
    sentence_words = nltk.word_tokenize(sentence, language='portuguese')
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words


# Converting the sentence into a list full of 0's and 1's that indicates whether the word is present or not
def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w.lower():
                bag[i] = 1
    return np.array(bag)

# A function to predict the class based on the sentence given by the user
def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    
    # print('results list', results)
    return return_list

# Getting the response from the chatbot
def get_response(intents_list):
    # print("getting response", intents_list)
    tag = intents_list[0]['intent']
    list_of_intents = intents['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            if float(intents_list[0]['probability']) < 0.5:
                result = "Desculpe, não entendi"
            else:
                result = random.choice(i['responses'])
            break
    return result

print("The chatbot is working")

# while True:
#     message = input("")
#     ints = predict_class(message)
#     res = get_response(ints)
#     print(res)


