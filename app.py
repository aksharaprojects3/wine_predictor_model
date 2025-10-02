from flask import Flask, request, render_template
import joblib

app = Flask(__name__)

# Load model
model = joblib.load("wine_quality_model.pkl")

@app.route("/")
def home():
    return render_template("index.html")  # your HTML page

@app.route("/predict", methods=["POST"])
def predict():
    data = request.form

    # Features in same order as trained model
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

    prediction = model.predict([features])
    result = "Good Quality Wine" if prediction[0] >= 6 else "Bad Quality Wine"

    return render_template("index.html", prediction=result)

if __name__ == "__main__":
    app.run(debug=True)


 