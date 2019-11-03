class View {
  constructor () {
    this.className = 'View'
  }

  init () {
    if (localStorage.API_KEY) {
      return localStorage.API_KEY
    } else {
      const API_KEY = prompt('Please enter your OpenWeather API Key')
      return API_KEY
    }
  }
}

export default View
