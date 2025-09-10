from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load your model
model = joblib.load("wine_model.pkl")

@app.route("/")
def home():
    return render_template("index.html")  # your HTML file

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Make sure keys match the JS JSON
    features = [
        data["fixed_acidity"],
        data["free_sulfur_dioxide"],
        data["volatile_acidity"],
        data["total_sulfur_dioxide"],
        data["citric_acid"],
        data["density"],
        data["residual_sugar"],
        data["ph"],
        data["alcohol"],
        data["sulphates"]
    ]

    # Make prediction
    prediction = model.predict([features])

    # Return result as JSON
    return jsonify({"prediction": float(prediction[0])})

if __name__ == "__main__":
    app.run(debug=True)


 