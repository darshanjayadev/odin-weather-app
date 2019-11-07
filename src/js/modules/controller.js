class Controller {
  constructor (model, view) {
    this.className = 'Controller'
    this.model = model
    this.view = view

    // VIEW HANDLER BINDING
    this.view.bindSubmitWeatherForm(this.handleFetchWeather.bind(this))
  }

  init () {
    const API_KEY = 'cc39a347130da6c7443563d23c272644'
    this.model.init(API_KEY)
  }

  // VIEW HANDLERS
  async handleFetchWeather (searchText, tempFormat = 'C') {
    try {
      this.view.renderLoading()
      const weatherData = await this.model.fetchWeatherByLocation(searchText)
      const processedWeatherData = this.model.processWeatherData(weatherData)
      this.view.renderWeatherData(processedWeatherData, tempFormat)
      this.view.bindTempFormatToggle(this.handleFetchWeather.bind(this))
    } catch (e) {
      this.view.renderError(e)
    }
  }
}

export default Controller
