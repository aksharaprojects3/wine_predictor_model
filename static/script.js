document.getElementById("wineForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // prevent page reload

    // Collect values from inputs
    const fixed_acidity = parseFloat(document.querySelector('input[name="fixed_acidity"]').value);
    const free_sulfur_dioxide = parseFloat(document.querySelector('input[name="free_sulfur_dioxide"]').value);
    const volatile_acidity = parseFloat(document.querySelector('input[name="volatile_acidity"]').value);
    const total_sulfur_dioxide = parseFloat(document.querySelector('input[name="total_sulfur_dioxide"]').value);
    const citric_acid = parseFloat(document.querySelector('input[name="citric_acid"]').value);
    const density = parseFloat(document.querySelector('input[name="density"]').value);
    const residual_sugar = parseFloat(document.querySelector('input[name="residual_sugar"]').value);
    const ph = parseFloat(document.querySelector('input[name="ph"]').value);
    const alcohol = parseFloat(document.querySelector('input[name="alcohol"]').value);
    const sulphates = parseFloat(document.querySelector('input[name="sulphates"]').value);

    try {
        // Send data to backend
        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fixed_acidity, free_sulfur_dioxide, volatile_acidity, total_sulfur_dioxide,
                citric_acid, density, residual_sugar, ph, alcohol, sulphates
            })
        });

        const data = await response.json();
        // Display prediction on page
        document.getElementById("result").innerText = "Predicted Wine Quality: " + data.prediction;

    } catch (error) {
        document.getElementById("result").innerText = "Error connecting to server: " + error;
    }
});
