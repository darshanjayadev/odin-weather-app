class Controller {
  constructor (model, view) {
    this.className = 'Controller'
    this.model = model
    this.view = view
  }

  init () {
    console.log('MVC up and running')
    const API_KEY = this.view.init()
    this.model.init(API_KEY)
    console.log(this.model.API_KEY)
  }
}

export default Controller
