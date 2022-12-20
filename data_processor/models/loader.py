import pickle
import tensorflow as tf

MODEL = "75"  # percentage of accuracy on validation set

tokenizer = pickle.load(open(f"models/{MODEL}.pickle", "rb"))
model = tf.keras.models.load_model(f"models/{MODEL}.h5")


def predict(text):
    text = tokenizer.texts_to_sequences([text])
    text = tf.keras.preprocessing.sequence.pad_sequences(text, padding='post', maxlen=200)
    return float(model.predict(text)[0])
