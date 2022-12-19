# sentiment analysis using tensorflow
import pickle

import pandas as pd
import tensorflow as tf
from keras.layers import SpatialDropout1D, Dropout

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Bidirectional
from tensorflow.keras.preprocessing.sequence import pad_sequences


print(tf.config.list_physical_devices('GPU'))

train = pd.read_csv('dataset/train.csv', encoding='latin-1')
test = pd.read_csv('dataset/test.csv', encoding='latin-1')

train = train.sample(frac=0.1).reset_index(drop=True)
test = test.sample(frac=0.1).reset_index(drop=True)

train_X = train[train.columns[5]]
train_Y = train[train.columns[0]] / 4

test_X = test[test.columns[5]]
test_Y = test[test.columns[0]] / 4

# print(train_X, train_Y, test_X, test_Y)

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

model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(train_X, train_Y, epochs=2, batch_size=128, validation_data=(test_X, test_Y))

model.save('model.h5')
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle)
