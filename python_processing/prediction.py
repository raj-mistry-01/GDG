import pandas as pd
import numpy as np
import tensorflow as tf
import joblib

def load_resources():
    """
    Load all required resources for prediction
    """
    model = tf.keras.models.load_model("final.keras")
    
    # Load scalers
    feature_scaler = joblib.load("scaler.pkl")
    target_scaler = joblib.load("target.pkl")
    
    # Load categorical mappings
    try:
        # Try to load mappings from saved file
        mappings = joblib.load("categorical_mappings.pkl")
        uniquecrop = mappings["crop"]
        uniqueseason = mappings["season"]
        uniquestate = mappings["state"]
    except:
        # Fallback to hardcoded mappings if file not found
        # Note: Values have been stripped of trailing spaces
        uniquecrop = {'Arecanut': 0, 'Arhar/Tur': 1, 'Castor seed': 2, 'Coconut': 3, 'Cotton(lint)': 4,
                  'Dry chillies': 5, 'Gram': 6, 'Jute': 7, 'Linseed': 8, 'Maize': 9, 'Mesta': 10,
                  'Niger seed': 11, 'Onion': 12, 'Other Rabi pulses': 13, 'Potato': 14, 'Rapeseed &Mustard': 15,
                  'Rice': 16, 'Sesamum': 17, 'Small millets': 18, 'Sugarcane': 19, 'Sweet potato': 20,
                  'Tapioca': 21, 'Tobacco': 22, 'Turmeric': 23, 'Wheat': 24, 'Bajra': 25, 'Black pepper': 26,
                  'Cardamom': 27, 'Coriander': 28, 'Garlic': 29, 'Ginger': 30, 'Groundnut': 31, 'Horse-gram': 32,
                  'Jowar': 33, 'Ragi': 34, 'Cashewnut': 35, 'Banana': 36, 'Soyabean': 37, 'Barley': 38,
                  'Khesari': 39, 'Masoor': 40, 'Moong(Green Gram)': 41, 'Other Kharif pulses': 42, 'Safflower': 43,
                  'Sannhamp': 44, 'Sunflower': 45, 'Urad': 46, 'Peas & beans (Pulses)': 47, 'other oilseeds': 48,
                  'Other Cereals': 49, 'Cowpea(Lobia)': 50, 'Oilseeds total': 51, 'Guar seed': 52,
                  'Other Summer Pulses': 53, 'Moth': 54}

        uniqueseason = {'Whole Year': 0, 'Kharif': 1, 'Rabi': 2, 'Autumn': 3, 'Summer': 4, 'Winter': 5}

        uniquestate = {'Assam': 0, 'Karnataka': 1, 'Kerala': 2, 'Meghalaya': 3, 'West Bengal': 4, 'Puducherry': 5,
                   'Goa': 6, 'Andhra Pradesh': 7, 'Tamil Nadu': 8, 'Odisha': 9, 'Bihar': 10, 'Gujarat': 11,
                   'Madhya Pradesh': 12, 'Maharashtra': 13, 'Mizoram': 14, 'Punjab': 15, 'Uttar Pradesh': 16,
                   'Haryana': 17, 'Himachal Pradesh': 18, 'Tripura': 19, 'Nagaland': 20, 'Chhattisgarh': 21,
                   'Uttarakhand': 22, 'Jharkhand': 23, 'Delhi': 24, 'Manipur': 25, 'Jammu and Kashmir': 26,
                   'Telangana': 27, 'Arunachal Pradesh': 28, 'Sikkim': 29}
    
    return model, feature_scaler, target_scaler, uniquecrop, uniqueseason, uniquestate

def predict_yield(crop, season, state, area, production, annual_rainfall, fertilizer, pesticide):
    """
    Predicts the crop yield based on input features.
    
    Args:
        crop (str): Name of the crop
        season (str): Growing season
        state (str): State name
        area (float): Cultivation area
        production (float): Production amount
        annual_rainfall (float): Annual rainfall in mm
        fertilizer (float): Fertilizer used
        pesticide (float): Pesticide used
        
    Returns:
        dict: Dictionary containing the predicted yield
    """
    # Load resources
    model, feature_scaler, target_scaler, uniquecrop, uniqueseason, uniquestate = load_resources()
    
    # Strip spaces from categorical inputs
    crop = crop.strip() if isinstance(crop, str) else crop
    season = season.strip() if isinstance(season, str) else season
    state = state.strip() if isinstance(state, str) else state

    # Create case-insensitive and space-normalized mappings for better matching
    crop_lookup = {k.lower().strip(): v for k, v in uniquecrop.items()}
    season_lookup = {k.lower().strip(): v for k, v in uniqueseason.items()}
    state_lookup = {k.lower().strip(): v for k, v in uniquestate.items()}
    
    # Print available options for debugging
    print(f"Available seasons: {list(uniqueseason.keys())}")
    
    # Try to find the best match for categorical inputs
    crop_key = crop.lower().strip()
    season_key = season.lower().strip()
    state_key = state.lower().strip()
    
    if crop_key not in crop_lookup:
        return {"error": f"Invalid crop: '{crop}'. Available crops: {list(uniquecrop.keys())}"}
    
    if season_key not in season_lookup:
        # Try to find a close match
        close_matches = [s for s in uniqueseason.keys() if s.lower().strip() == season_key]
        if close_matches:
            season = close_matches[0]
        else:
            return {"error": f"Invalid season: '{season}'. Available seasons: {list(uniqueseason.keys())}"}
        
    if state_key not in state_lookup:
        return {"error": f"Invalid state: '{state}'. Available states: {list(uniquestate.keys())}"}

    # Encode categorical values
    crop_encoded = crop_lookup[crop_key]
    season_encoded = season_lookup[season_key]
    state_encoded = state_lookup[state_key]

    # Create input DataFrame
    inp_df = pd.DataFrame([[crop_encoded, season_encoded, state_encoded, area, production,
                            annual_rainfall, fertilizer, pesticide]],
                          columns=['Crop', 'Season', 'State', 'Area', 'Production',
                                   'Annual_Rainfall', 'Fertilizer', 'Pesticide'])

    # Scale numerical features
    numerical_features = ['Area', 'Production', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
    inp_df[numerical_features] = feature_scaler.transform(inp_df[numerical_features])

    # Make prediction
    scaled_prediction = model.predict(inp_df, verbose=0)  # verbose=0 to suppress output
    
    # Inverse transform to get the actual yield prediction
    original_scale_prediction = target_scaler.inverse_transform(scaled_prediction)

    return {
        "Predicted Yield": float(original_scale_prediction[0][0]),
        "Input Parameters": {
            "Crop": crop,
            "Season": season,
            "State": state,
            "Area": area,
            "Production": production,
            "Annual Rainfall": annual_rainfall,
            "Fertilizer": fertilizer,
            "Pesticide": pesticide
        }
    }


if __name__ == "__main__":
    result = predict_yield('Arecanut', 'Whole Year', 'Assam', 73814, 56708, 2051, 7024878, 22882)
    print(f"Prediction: {result}")