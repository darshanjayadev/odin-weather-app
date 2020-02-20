import React from 'react'
import { theme, ThemeContext } from './ThemeContextProvider'

const WeatherSearch = () => {
  const searchInput = React.createRef();
  const [weatherData, setWeatherData] = React.useState({
    name: '',
    weather: [{
      description: '',
      icon: '',
    }],
    main: {
      temp: '',
      temp_max: '',
      temp_min: '',
    }
  });

  const searchWeather = async (event, changeTheme) => {
    event.preventDefault();
    const location = searchInput.current.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cc39a347130da6c7443563d23c272644`)
    const jsonResponse = await response.json()
    setWeatherData(jsonResponse);
    const currentTemp = (jsonResponse.main.temp - 273.15).toFixed(1);
    if ( currentTemp < 0) {
      changeTheme(theme["freezing"]);
    } else if ( currentTemp < 15) {
      changeTheme(theme["cold"]);
    } else if ( currentTemp < 20) {
      changeTheme(theme["perfect"]);
    } else if ( currentTemp < 30 ) {
      changeTheme(theme["warm"]);
    } else {
      changeTheme(theme["hot"]);
    }
  }

  const weatherDataDisplay = (
    <article className="data-display">
      <h2>{weatherData.name}</h2>
      <div className="weather">
        <p className="description">{weatherData.weather[0].description}</p>
        <img className="weather-icon" alt="weather icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
      </div>
      <div className="main">
        <p className="current">Current: {(weatherData.main.temp - 273.15).toFixed(1)}ºC</p>
        <p className="current">Min: {(weatherData.main.temp_min - 273.15).toFixed(1)}ºC</p>
        <p className="current">Max: {(weatherData.main.temp_max - 273.15).toFixed(1)}ºC</p>
      </div>
    </article>
  )
  return (
    <ThemeContext.Consumer>
      {({ theme, changeTheme }) => (
        <div className="weather-search">
          <header className="search">
            <form className="search-form" onSubmit={(e) => {searchWeather(e, changeTheme)}}>
              <input ref={searchInput} type="search" name="location" id="location" className="search-input" placeholder="City Name" required />
              <button className="btn">Get Weather</button>
            </form>
          </header>
          <section className="weather-data">
            {weatherData.name === "" ? '' : weatherDataDisplay}
          </section>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default WeatherSearch;

