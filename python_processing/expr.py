import pandas as pd
import joblib

# Load the scaler
scaler = joblib.load(r"C:\Users\raj\Desktop\GDG\GDG\flask\scaler.pkl")

# Check the mean and std deviation of numerical features
print("Mean of features during training:", scaler.mean_)
print("Standard deviation of features during training:", scaler.scale_)
