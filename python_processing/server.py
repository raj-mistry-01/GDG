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
    image.filename = "test.jpg"
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(image_path)
    pc = getfromcnn(image_path=image_path)
    return jsonify({"predictedClass" : pc})


if __name__ == "__main__":
    app.run(debug=True)