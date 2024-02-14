# web3

## Assignment3

### Admin username and password are my name(all lowercase letters)

This is a Node.js application built with Express.js framework for handling HTTP requests. The application provides functionality for user authentication, fetching weather information, fetching top random user data, and retrieving NASA's picture of the day. Also it provides admin panel where user with admin rights can watch user history(API requests) or create,edit or delete other users.

## To install and run the project, follow these steps:

1.Clone this repository to your local machine. 

2.Install dependencies using npm install.

3.Start the server using node app.js.

## Dependencies

* Express.js: Web application framework for Node.js.
* Body-parser: Node.js body parsing middleware.
* Request: Simplified HTTP client.
* Express-session: Simple session middleware for Express.
* EJS: Embedded JavaScript templating.
* Node-fetch: A lightweight module that brings Fetch API to Node.js.
* Mongoose: MongoDB object modeling tool.
  
## Usage
Access the application by visiting http://localhost:3000 in your web browser.
## Endpoints
* /login: Renders the login page.
* /register: Renders the registration page.
* /random-user: Provides random users information if user can not create one.
* /weather: Renders the weather information page.
* /nasa-picture: Fetches and displays NASA's picture of the day.

## API Keys
* Ensure you have valid API keys for OpenWeatherMap and NasaAPI. Update the apiKey and newsApiKey variables in app.js with your API keys.
* Ensure you have a MongoDB Atlas URI configured. Update the uri variable in user.js with your MongoDB Atlas URI.

1.OpenWeatherMap API: This API is used to fetch weather information. The application utilizes this API to display weather conditions based on user input (city name or coordinates). Weather data such as temperature, humidity, pressure, and wind speed are presented to the user.

2.Random user API: Provides developers with randomly generated user data. It allows to retrieve various types of user information such as names, addresses, emails, phone numbers, and more.

3.NASA API: The NASA API is used to retrieve the Picture of the Day (APOD). 

