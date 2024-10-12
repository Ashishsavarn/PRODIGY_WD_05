const apiKey = 'c8a847918439795a96f8e19892e635e8'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeather').addEventListener('click', async () => {
    const location = document.getElementById('locationInput').value;
    const weatherResult = document.getElementById('weatherResult');
    const body = document.body; // Get the body element

    if (!location) {
        weatherResult.innerHTML = 'Please enter a location.';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherResult.innerHTML = 'Location not found.';
            body.className = ''; // Reset body class
            return;
        }

        const { name, main: { temp, humidity }, weather } = data;
        const weatherCondition = weather[0].main.toLowerCase(); // Get the main weather condition

        // Update the body class based on the weather condition
        body.className = weatherCondition; // e.g., "sunny", "rainy", etc.

        weatherResult.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Condition: ${weather[0].description}</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = 'Error fetching weather data.';
        body.className = ''; // Reset body class on error
    }
});
