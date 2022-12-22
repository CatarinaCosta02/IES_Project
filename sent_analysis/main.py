# sentiment analysis using tensorflow
import pickle

import pandas as pd
import tensorflow as tf
from keras.layers import SpatialDropout1D, Dropout

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Bidirectional
from tensorflow.keras.preprocessing.sequence import pad_sequences


train = pd.read_csv('dataset/train.csv', encoding='latin-1', header=None)
test = pd.read_csv('dataset/test.csv', encoding='latin-1', header=None)

train = train.sample(frac=1).reset_index(drop=True)
test = test.sample(frac=1).reset_index(drop=True)

n_records_per_class = 10000

# train_X = train[train.columns[5]]
train_X = pd.concat([train[train[0] == 0].head(n_records_per_class), train[train[0] == 4].head(n_records_per_class)])
train_X = train_X[train_X.columns[5]]
train_Y = train[train.columns[0]] / 4
train_Y = pd.concat([train_Y[train[0] == 0].head(n_records_per_class), train_Y[train[0] == 4].head(n_records_per_class)])

test_X = pd.concat([test[test[0] == 0].head(n_records_per_class), test[test[0] == 4].head(n_records_per_class)])
test_X = test_X[test.columns[5]]
test_Y = test[test.columns[0]] / 4
test_Y = pd.concat([test_Y[test[0] == 0].head(n_records_per_class), test_Y[test[0] == 4].head(n_records_per_class)])

tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(train_X)

train_X = tokenizer.texts_to_sequences(train_X)
test_X = tokenizer.texts_to_sequences(test_X)

# print(train_X, test_X)

train_X = pad_sequences(train_X, padding='post', maxlen=200)
test_X = pad_sequences(test_X, padding='post', maxlen=200)

model = Sequential()


model.add(Embedding(len(tokenizer.word_index) + 1, 64, input_length=200))
model.add(SpatialDropout1D(0.25))
model.add(Bidirectional(LSTM(256, dropout=0.5, recurrent_dropout=0.5)))
model.add(Dropout(0.2))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(train_X, train_Y, epochs=2, batch_size=128, validation_data=(test_X, test_Y))

model.save('model.h5')
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle)
