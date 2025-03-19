from flask import Flask, jsonify, send_file , request , g
from bson import ObjectId
import ast
from flask_cors import CORS , cross_origin
import numpy
import prediction
app = Flask(__name__)
CORS(app)


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


if __name__ == "__main__":
    app.run(debug=True)