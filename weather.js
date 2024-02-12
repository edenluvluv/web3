// weather.js
document.addEventListener('DOMContentLoaded', () => {
    const weatherInfoContainer = document.getElementById('weather-info');
    const coordinatesForm = document.getElementById('coordinates-form');
  
    const map = L.map('map').setView([0, 0], 2); 
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
    coordinatesForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const lat = parseFloat(document.getElementById('latitude').value);
      const lon = parseFloat(document.getElementById('longitude').value);
  
      map.setView([lat, lon], 10); 
  
      fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(weatherData => {
          const html = `
            <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <div class="weather-description">
              <p>Description: ${weatherData.weather[0].description}</p>
              <img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="icon">
            </div>
            <p>Feels Like: ${weatherData.main.feels_like}°C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Pressure: ${weatherData.main.pressure} hPa</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            <p>Rain (last 3 hours): ${weatherData.rain ? weatherData.rain['3h'] : 0} mm</p>
            <p>Coordinates: (${weatherData.coord.lat}, ${weatherData.coord.lon})</p>
          `;
          weatherInfoContainer.innerHTML = html;
          fetch(`https://restcountries.com/v2/alpha/${weatherData.sys.country}`)
          .then(response => response.json())
          .then(countryData => {
            const countryHtml = `
              <h3>Country Information</h3>
              <p>Country: ${countryData.name}</p>
              <p>Capital: ${countryData.capital}</p>
              <p>Population: ${countryData.population}</p>
            `;
            weatherInfoContainer.innerHTML += countryHtml;
          })
          .catch(error => {
            console.error('Failed to fetch country data:', error);
          });
  
        const newsApiKey = 'ac89d2647153421abc38717738f50dd6'; 
        const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${weatherData.sys.country}&apiKey=${newsApiKey}`;
  
        axios.get(newsApiUrl)
          .then(response => {
            const articles = response.data.articles.slice(0, 3);
            const newsHtml = `
              <h3>Latest News</h3>
              <ul>
                ${articles.map(article => `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`).join('')}
              </ul>
            `;
            weatherInfoContainer.innerHTML += newsHtml;
          })
          .catch(error => {
            console.error('Failed to fetch news data:', error);
          });
          
          fetch(`https://api.nasa.gov/planetary/apod?api_key=uc5R1O8Vl8bKS6ICGtKVW7p7KfI0hcXZTPH5erZ5`)
          .then(response => response.json())
          .then(nasaData => {
            const nasaHtml = `
              <h3>Astronomy Picture of the Day</h3>
              <img src="${nasaData.url}" alt="${nasaData.title}">
              <p>${nasaData.explanation}</p>
            `;
            document.getElementById('nasa-info').innerHTML = nasaHtml;
          })
          .catch(error => {
            console.error('Failed to fetch NASA data:', error);
          });
        })
        .catch(error => {
          console.error(error);
          weatherInfoContainer.innerHTML = 'Failed to fetch weather data.';
        });
    });
  
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 10); 
      }, (error) => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  });
  