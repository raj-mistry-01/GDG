import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import joblib

# Load dataset
df = pd.read_csv('/content/drive/MyDrive/Colab Notebooks/crop_yield.csv')

# Drop non-relevant columns
df = df.drop('Crop_Year', axis=1)

# Strip spaces from categorical columns
df['Crop'] = df['Crop'].str.strip()
df['Season'] = df['Season'].str.strip()
df['State'] = df['State'].str.strip()

# Encode categorical columns
uniquecrop = {crop: idx for idx, crop in enumerate(df['Crop'].unique())}
uniqueseason = {season: idx for idx, season in enumerate(df['Season'].unique())}
uniquestate = {state: idx for idx, state in enumerate(df['State'].unique())}

df['Crop'] = df['Crop'].map(uniquecrop)
df['Season'] = df['Season'].map(uniqueseason)
df['State'] = df['State'].map(uniquestate)

# Define feature sets
numerical_cols = ['Area', 'Production', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
categorical_cols = ['Crop', 'Season', 'State']

# Scale numerical features
feature_scaler = StandardScaler()
df[numerical_cols] = feature_scaler.fit_transform(df[numerical_cols])

# Create a separate scaler for the target variable
target_scaler = StandardScaler()
df['Scaled_Yield'] = target_scaler.fit_transform(df[['Yield']])

# Train-test split
X = df.drop(['Yield', 'Scaled_Yield'], axis=1)
y = df['Scaled_Yield']  # Use scaled yield for training
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

# Define and train the model
model = Sequential([
    Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    Dense(64, activation='relu'),
    Dense(32, activation='relu'),
    Dense(1, activation='linear')
])

model.compile(optimizer='adam', loss='mse', metrics=['mae', 'mse'])
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_val, y_val))
# 
# Save the model, feature scaler, and target scaler
model.save('final.keras')
joblib.dump(feature_scaler, "scaler.pkl")
joblib.dump(target_scaler, "target.pkl")
joblib.dump({"crop": uniquecrop, "season": uniqueseason, "state": uniquestate}, "categorical_mappings.pkl")

print("Training completed and model saved successfully!")
print("Categorical mappings:")
print(f"Crop types: {list(uniquecrop.keys())}")
print(f"Seasons: {list(uniqueseason.keys())}")
print(f"States: {list(uniquestate.keys())}")