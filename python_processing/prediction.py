import tensorflow as tf
import numpy as np
import pandas as pd
import joblib  # For loading scaler

# Load saved model and scalers
model = tf.keras.models.load_model(r"C:\Users\raj\Desktop\GDG\GDG\flask\yield_model.keras")
scaler_X = joblib.load(r"C:\Users\raj\Desktop\GDG\GDG\flask\scaler_X.pkl")  
scaler_y = joblib.load(r"C:\Users\raj\Desktop\GDG\GDG\flask\scaler_y.pkl")  
original_columns = joblib.load(r"C:\Users\raj\Desktop\GDG\GDG\flask\feature_columns.pkl")  

# Remove "Yield" from columns if present
if "Yield" in original_columns:
    original_columns.remove("Yield")

# Define feature types
categorical_cols = ['Crop', 'Season', 'State']
numerical_cols = ['Area', 'Production', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']

def preprocess_input(user_input):
    """Preprocess user input before making predictions."""
    crop, _, season, state, area, production, rainfall, fertilizer, pesticide = user_input  

    # Create DataFrame from input
    user_df = pd.DataFrame([[crop, season, state, area, production, rainfall, fertilizer, pesticide]],
                           columns=categorical_cols + numerical_cols)

    # One-hot encode categorical columns
    user_df = pd.get_dummies(user_df, columns=categorical_cols)

    # Ensure all expected columns exist
    for col in original_columns:
        if col not in user_df.columns:
            user_df[col] = 0  # Fill missing columns with 0

    # Ensure column order matches training
    user_df = user_df[original_columns]

    # Standardize numerical features
    user_df[numerical_cols] = scaler_X.transform(user_df[numerical_cols])

    return user_df.to_numpy().astype(np.float32)

def predict_yield(model, user_input):
    """Predicts yield using preprocessed input."""
    processed_input = preprocess_input(user_input)
    scaled_prediction = model.predict(processed_input)
    
    # Inverse transform to original scale
    prediction = scaler_y.inverse_transform(scaled_prediction.reshape(-1, 1))
    
    return prediction[0][0]  # Return single value

# Example usage
if __name__ == "__main__":
    user_input = ["Arecanut", 1997, "Whole Year", "Assam", 73814, 56708, 2051.4, 7024878.38, 22882.34]
    predicted_yield = predict_yield(model, user_input)
    print(f"Predicted Yield: {predicted_yield}")
