class View {
  constructor () {
    this.className = 'View'
    this.weatherForm = document.querySelector('.weather-search')
    this.weatherDataContainer = document.querySelector('.weather-data')
    this.temperatureMap = {
      '322+': 'rgb(34,0,0)',
      '316 to 322': 'rgb(58,0,0)',
      '310 to 316': 'rgb(88,0,0)',
      '305 to 310': 'rgb(192,0,0)',
      '299 to 305': 'rgb(255,0,0)',
      '294 to 299': 'rgb(255,192,0)',
      '288 to 294': 'rgb(255,255,0)',
      '283 to 288': 'rgb(204,102,0)',
      '277 to 283': 'rgb(146, 208, 80)',
      '272 to 277': 'rgb(115,190,211)',
      '260 to 272': 'rgb(0, 112, 192)',
      '244 to 260': 'rgb(112, 48, 160)',
      '233 to 244': 'rgb(214, 0, 147)',
      '233-': 'rgb(255, 102, 153)'
    }
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
      event.target.querySelector('#location').value = ''
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

  renderLoading () {
    const background = document.querySelector('.background')
    background.style.display = 'none'
    const header = document.querySelector('header')
    header.querySelector('.title').style.display = 'none'
    header.style.height = '10vh'

    const loadingDisplay = this.createElement('h3', 'loading')
    loadingDisplay.textContent = 'Loading...Please Wait'
    this.weatherDataContainer.append(loadingDisplay)
  }

  renderWeatherData (weatherData, tempFormat) {
    this.weatherDataContainer.innerHTML = ''
    document.querySelector('footer').style.display = 'none'
    const locationName = this.createElement('h2', 'location-name')
    locationName.textContent = `${weatherData.locationName}, ${weatherData.country}`

    const tempFormatChanger = this.createElement('button', 'change-temp-format btn')
    if (tempFormat === 'C') {
      tempFormatChanger.textContent = 'Change to F'
      tempFormatChanger.id = 'C'
    } else {
      tempFormatChanger.textContent = 'Change to C'
      tempFormatChanger.id = 'F'
    }

    const weather = this.createElement('div', 'weather')
    const weatherDescription = this.createElement('p', 'description')
    weatherDescription.textContent = weatherData.weather[0].description
    const weatherIcon = this.createElement('img', 'weather-icon')
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
    weather.append(weatherDescription, weatherIcon)

    const temperatureContainer = this.createElement('div', 'main')
    const currentTemp = this.createElement('div', 'curr-temp')
    const maxTemp = this.createElement('div', 'max-temp')
    const minTemp = this.createElement('div', 'min-temp')
    currentTemp.textContent = this.temperatureHelper(weatherData.main.temp, 'Current', tempFormat)
    this.tempMaprenderer(weatherData.main.temp)
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
    return `${desc}: ${convertedTemp.toFixed(1)} º${tempFormat}`
  }

  tempMaprenderer (temp) {
    const body = document.querySelector('body')
    if (temp > 322) {
      body.style.backgroundColor = this.temperatureMap['322+']
    } else if (temp > 316 & temp <= 322) {
      body.style.backgroundColor = this.temperatureMap['316 to 322']
    } else if (temp > 310 && temp <= 316) {
      body.style.backgroundColor = this.temperatureMap['310 to 316']
    } else if (temp > 310 && temp <= 316) {
      body.style.backgroundColor = this.temperatureMap['305 to 310']
    } else if (temp > 305 && temp <= 310) {
      body.style.backgroundColor = this.temperatureMap['299 to 305']
    } else if (temp > 299 && temp <= 305) {
      body.style.backgroundColor = this.temperatureMap['294 to 299']
    } else if (temp > 294 && temp <= 299) {
      body.style.backgroundColor = this.temperatureMap['288 to 294']
    } else if (temp > 288 && temp <= 294) {
      body.style.backgroundColor = this.temperatureMap['283 to 288']
    } else if (temp > 283 && temp <= 288) {
      body.style.backgroundColor = this.temperatureMap['277 to 283']
    } else if (temp > 277 && temp <= 283) {
      body.style.backgroundColor = this.temperatureMap['272 to 277']
    } else if (temp > 272 && temp <= 277) {
      body.style.backgroundColor = this.temperatureMap['260 to 272']
    } else if (temp > 260 && temp <= 272) {
      body.style.backgroundColor = this.temperatureMap['244 to 260']
    } else if (temp > 244 && temp <= 260) {
      body.style.backgroundColor = this.temperatureMap['244 to 260']
    } else if (temp > 233 && temp <= 244) {
      body.style.backgroundColor = this.temperatureMap['233 to 244']
    } else {
      body.style.backgroundColor = this.temperatureMap['233-']
    }
  }
}

export default View
