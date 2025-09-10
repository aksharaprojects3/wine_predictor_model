document.getElementById("predictBtn").addEventListener("click", async function () {
    // Collect input values
    const inputs = document.querySelectorAll("input");
    let values = [];
    inputs.forEach(input => values.push(parseFloat(input.value)));

    try {
        // Send data to backend
        let response = await fetch("https://wine-predictor-2.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: values })
        });

        // Get prediction
        let result = await response.json();
        alert("Predicted Wine Quality: " + result.prediction);

    } catch (error) {
        alert("Error connecting to server: " + error);
    }
});