document.getElementById("wineForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // stop page reload

    // Collect values from inputs
    const fixed_acidity = parseFloat(document.querySelector('input[name="fixed_acidity"]').value);
    const volatile_acidity = parseFloat(document.querySelector('input[name="volatile_acidity"]').value);
    const citric_acid = parseFloat(document.querySelector('input[name="citric_acid"]').value);
    const residual_sugar = parseFloat(document.querySelector('input[name="residual_sugar"]').value);
    const free_sulfur_dioxide = parseFloat(document.querySelector('input[name="free_sulfur_dioxide"]').value);
    const total_sulfur_dioxide = parseFloat(document.querySelector('input[name="total_sulfur_dioxide"]').value);
    const density = parseFloat(document.querySelector('input[name="density"]').value);
    const pH = parseFloat(document.querySelector('input[name="pH"]').value);
    const sulphates = parseFloat(document.querySelector('input[name="sulphates"]').value);
    const alcohol = parseFloat(document.querySelector('input[name="alcohol"]').value);

    try {
        // Send JSON data to Flask
        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fixed_acidity,
                volatile_acidity,
                citric_acid,
                residual_sugar,
                free_sulfur_dioxide,
                total_sulfur_dioxide,
                density,
                pH,
                sulphates,
                alcohol
            })
        });

        if (!response.ok) throw new Error("Server error: " + response.statusText);

        const data = await response.json();

        // Show result
        document.getElementById("result").innerText = "Predicted Wine Quality: " + data.result;

    } catch (error) {
        document.getElementById("result").innerText = "Error: " + error.message;
    }
});
