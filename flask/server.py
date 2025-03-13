from flask import Flask, jsonify, send_file , request , g
from pymongo.errors import PyMongoError
from bson import ObjectId
import ast
from flask_cors import CORS , cross_origin
import numpy
app = Flask(__name__)
CORS(app)


@app.route("/test" , methods = ["GET"])
def testing() : 
    return jsonify({"ok" : "ok"})


if __name__ == "__main__":
    app.run(debug=True)