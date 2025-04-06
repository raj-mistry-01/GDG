from flask import Flask, jsonify, send_file , request , g
from bson import ObjectId
import ast
from flask_cors import CORS , cross_origin
import numpy
import prediction
from webscrap import get_medicine_text
import os
# from google.cloud import storage
from CNN_use import getfromcnn
from cropAdvisoryPrediction import predict_crop_advice
import datetime
import ee
import json
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "test_image"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/test" , methods = ["GET"])
def testing() : 
    return jsonify({"ok" : "ok"})

@app.route('/predict', methods=['POST'])
def submit():
    data = request.get_json() 
    print("Received Data:", data)
    print(data['crop'])
    print(data['season'])
    print(data['state'])
    print(data['area'])
    print(data['production'])
    print(data['annual_rainfall'])
    print(data['fertilizer'])
    print(data['pesticide'])
    result = prediction.predict_yield(data['crop'], data['season'], data['state'], data['area'], data['production'], data['annual_rainfall'], data['fertilizer'], data['pesticide'])
    return result, 200

@app.route("/prc",methods = ["POST"])
def cnn() : 
    image = request.files["image"]
    return jsonify({"ok" : "pl"})


@app.route('/getmedjson' , methods = ['GET'])
def getmedjson() :
    return jsonify(get_medicine_text())



# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google_cloud.json"
# bucket_name = "your-bucket-name"

# def upload_to_gcs(file, filename):
#     client = storage.Client()
#     bucket = client.bucket(bucket_name)
#     blob = bucket.blob(filename)
#     blob.upload_from_file(file)
#     return f"https://storage.googleapis.com/{bucket_name}/{filename}"

# @app.route("/upload", methods=["POST"])
# def upload_file():
#     if "file" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["file"]
#     filename = file.filename

#     try:
#         file_url = upload_to_gcs(file, filename)
#         return jsonify({"message": "Upload successful", "url": file_url}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@app.route("/cn" , methods = ["POST"])
def cn() : 
    image = request.files["file"]
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(image_path)
    pc = getfromcnn(image_path=image_path)
    return jsonify({"predictedClass" : pc}) 


@app.route("/cropadvice" , methods = ["POST"]) 
def cpadv() : 
    data = request.get_json()
    N = float(data["N"])
    P = float(data["P"])
    K = float(data["K"])
    temperature = float(data["temperature"])
    humidity = float(data["humidity"])
    ph = float(data['ph'])
    rainfall = float(data["rainfall"])
    # print(ph)
    test_input = [N, P , K , temperature ,humidity , ph , rainfall]
    print(predict_crop_advice(test_input))
    # return jsonify({"ok" : "ok"})
    return jsonify({"rec_crops" : predict_crop_advice(test_input)})

# Load credentials
with open('googleEarthEngineCredintials.json') as f:
    private_key = json.load(f)

# Authenticate Earth Engine using service account credentials
credentials = ee.ServiceAccountCredentials(
    email=private_key['client_email'],
    key_file='googleEarthEngineCredintials.json'
)

ee.Initialize(credentials)
print("✅ Earth Engine initialized in Flask")

@app.route('/moisture', methods=['POST'])
def get_soil_moisture():
    data = request.get_json()
    # print(data)
    lat = data["lat"]
    lon = data["lon"]

    if not lat or not lon:
        return jsonify({'error': 'Latitude and longitude are required'}), 400

    try:
        point = ee.Geometry.Point([float(lon), float(lat)])
        end_date = datetime.datetime.utcnow()
        start_date = end_date - datetime.timedelta(days=7)

        smap = ee.ImageCollection('NASA/SMAP/SPL4SMGP/007') \
            .filterDate(start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')) \
            .select('sm_surface')

        image = smap.mean()
        moisture = image.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=point,
            scale=10000
        ).get('sm_surface')

        result = moisture.getInfo()
        value = round(result * 100, 1) if result is not None else None

        return jsonify({'moisture': value})

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'error': 'Failed to fetch soil moisture'}), 500


if __name__ == "__main__":
    app.run(debug=True)