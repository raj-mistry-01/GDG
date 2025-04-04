import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import Callback

# Label encoding dictionary
codes = {
    'apple': 0, 'banana': 1, 'blackgram': 2, 'chickpea': 3, 'coconut': 4, 'coffee': 5,
    'corn': 6, 'cotton': 7, 'grapes': 8, 'jute': 9, 'kidneybeans': 10, 'lentil': 11,
    'mango': 12, 'mothbeans': 13, 'mungbean': 14, 'muskmelon': 15, 'orange': 16,
    'papaya': 17, 'pigeonpeas': 18, 'pomegranate': 19, 'rice': 20, 'watermelon': 21
}
labels_to_names = {v: k for k, v in codes.items()}

# ✅ Load the trained model
model = load_model("crop_model.keras")

# ✅ Prediction function
def predict_crop_advice(data):
    input_data = np.array(data).reshape(1, -1)
    output_probs = model.predict(input_data, verbose=0)
    
    top_indices = output_probs[0].argsort()[-3:][::-1]  # top 3 predictions
    predicted_crops = [labels_to_names[idx] for idx in top_indices]
    
    return predicted_crops

# ✅ Test the function
test_input = [90, 42, 43, 20.87974371, 82.00274423, 6.9078, 202.9355362]

if __name__ == "__main__" : 
    print()