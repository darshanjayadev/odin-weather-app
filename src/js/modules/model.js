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
    const processedWeatherData = {
      locationName: weatherData.name,
      country: weatherData.sys.country,
      main: weatherData.main,
      weather: weatherData.weather,
      dt: weatherData.dt
    }
    return processedWeatherData
  }
}

export default Model
