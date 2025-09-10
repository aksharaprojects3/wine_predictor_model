from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np 

app = Flask(__name__)

# Load your model
model = joblib.load("wine_model.pkl")

# Serve frontend
@app.route("/")
def home():
    return render_template("index.html")

# API route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    # Example: change keys to match your HTML form
    features = [data["feature1"], data["feature2"], data["feature3"]]
    prediction = model.predict([features])
    return jsonify({"prediction": prediction[0]})

if __name__ == "__main__":
    app.run(debug=True)

 