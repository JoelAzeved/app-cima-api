const express = require('express');
const https = require('https');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(express.static('public'));

app.get('/weather', (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  https.get(apiWeatherURL, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      const weatherData = JSON.parse(data);
      res.json(weatherData);
    });
  }).on('error', (error) => {
    console.error('Erro na chamada à API:', error);
    res.status(500).json({ error: 'Erro na chamada à API' });
  });
});


