class View {
  constructor () {
    this.className = 'View'
    this.weatherForm = document.querySelector('.weather-search')
    this.weatherDataContainer = document.querySelector('.weather-data')
  }

  init () {
    if (localStorage.API_KEY) {
      return localStorage.API_KEY
    } else {
      const API_KEY = prompt('Please enter your OpenWeather API Key')
      return API_KEY
    }
  }

  createElement (ele, className) {
    const element = document.createElement(ele)
    element.className = className
    return element
  }

  bindSubmitWeatherForm (handler) {
    this.weatherForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const searchText = event.target.querySelector('#location').value
      handler(searchText)
    })
  }

  bindTempFormatToggle (handler) {
    const tempFormatChanger = document.querySelector('.change-temp-format')
    const locationName = document.querySelector('.location-name').textContent
    const tempFormat = tempFormatChanger.id === 'C' ? 'F' : 'C'
    tempFormatChanger.addEventListener('click', (event) => {
      event.preventDefault()
      handler(locationName, tempFormat)
    })
  }

  renderWeatherData (weatherData, tempFormat) {
    this.weatherDataContainer.innerHTML = ''
    const locationName = this.createElement('h2', 'location-name')
    locationName.textContent = `${weatherData.locationName}, ${weatherData.country}`

    const tempFormatChanger = this.createElement('button', 'change-temp-format')
    if (tempFormat === 'C') {
      tempFormatChanger.textContent = 'Change to F'
      tempFormatChanger.id = 'C'
    } else {
      tempFormatChanger.textContent = 'Change to C'
      tempFormatChanger.id = 'F'
    }

    const weather = this.createElement('div', 'weather')
    const weatherTitle = this.createElement('h3', 'main')
    weatherTitle.textContent = weatherData.weather[0].main
    const weatherDescription = this.createElement('p', 'description')
    weatherDescription.textContent = weatherData.weather[0].description
    weather.append(weatherTitle, weatherDescription)

    const temperatureContainer = this.createElement('div', 'main')
    const currentTemp = this.createElement('div', 'curr-temp')
    const maxTemp = this.createElement('div', 'max-temp')
    const minTemp = this.createElement('div', 'min-temp')
    currentTemp.textContent = this.temperatureHelper(weatherData.main.temp, 'Current', tempFormat)
    maxTemp.textContent = this.temperatureHelper(weatherData.main.temp_max, 'Max', tempFormat)
    minTemp.textContent = this.temperatureHelper(weatherData.main.temp_min, 'Min', tempFormat)
    temperatureContainer.append(currentTemp, minTemp, maxTemp)

    this.weatherDataContainer.append(locationName, weather, temperatureContainer, tempFormatChanger)
  }

  temperatureHelper (temp, desc, tempFormat) {
    let convertedTemp
    if (tempFormat === 'F') {
      convertedTemp = (temp - 273.15) * 1.8 + 32
    } else {
      convertedTemp = temp - 273.15
    }
    return `${desc}: ${convertedTemp.toFixed(1)}`
  }
}

export default View
