from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("wine_model (4).pkl")

@app.route('/')
def home():
    return "Wine Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()   # JSON input lo
    features = np.array(data['features']).reshape(1, -1)  # Features ko reshape karo
    prediction = model.predict(features)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '_main_':
    app.run(host='0.0.0.0', port=10000, debug=True)
 