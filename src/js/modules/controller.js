class Controller {
  constructor (model, view) {
    this.className = 'Controller'
    this.model = model
    this.view = view
  }

  async init () {
    console.log('MVC up and running')
    const API_KEY = this.view.init()
    this.model.init(API_KEY)
    console.log(this.model.API_KEY)
    const weatherData = await this.model.fetchWeatherByLocation('Tokyo, JP')
    const processedWeatherData = this.model.processWeatherData(weatherData)
    console.log(processedWeatherData)
  }
}

export default Controller
