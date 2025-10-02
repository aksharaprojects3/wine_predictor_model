from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load model
model = joblib.load("wine_quality_model.pkl")

@app.route("/")
def home():
    return render_template("index.html")  # your HTML page

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()  # <-- important change

    # Features in the same order as trained model
    features = [
        float(data["fixed_acidity"]),
        float(data["volatile_acidity"]),
        float(data["citric_acid"]),
        float(data["residual_sugar"]),
        float(data["free_sulfur_dioxide"]),
        float(data["total_sulfur_dioxide"]),
        float(data["density"]),
        float(data["pH"]),
        float(data["sulphates"]),
        float(data["alcohol"])
    ]

    prediction = model.predict([features])[0]
    result = "Good Quality Wine" if prediction >= 6 else "Bad Quality Wine"

    # Return JSON instead of rendering template
    return jsonify({"prediction": int(prediction), "result": result})

if __name__ == "__main__":
    app.run(debug=True)


 