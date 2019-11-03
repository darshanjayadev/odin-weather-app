class Model {
  constructor () {
    this.className = 'Model'
  }

  init (API_KEY) {
    this.API_KEY = API_KEY
    localStorage.API_KEY = this.API_KEY
  }

  async fetchWeatherByLocation (location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.API_KEY}`)
    const weatherData = await response.json()
    return weatherData
  }

  processWeatherData (weatherData) {
    console.log(weatherData)
    const processedWeatherData = {
      coord: weatherData.coord,
      main: weatherData.main,
      country: weatherData.sys.country,
      cityName: weatherData.name,
      cityID: weatherData.sys.id,
      weather: weatherData.weather
    }
    return processedWeatherData
  }
}

export default Model
