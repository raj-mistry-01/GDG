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
    result = prediction.predict_yield('Arecanut', 'Whole Year', 'Assam', 73804, 56708, 2051, 7024878, 22882)
    print(f"Prediction: {result}")
    return jsonify({"ok" : "ok"})

@app.route('/predict', methods=['POST'])
def submit():
    data = request.get_json() 
    print("Received Data:", data)
    print("crop : "  , data['crop'])
    return jsonify({"yiled": "model is not ready"}), 200


if __name__ == "__main__":
    app.run(debug=True)