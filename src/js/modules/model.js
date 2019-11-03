class Model {
  constructor () {
    this.className = 'Model'
  }

  init (API_KEY) {
    this.API_KEY = API_KEY
    localStorage.API_KEY = this.API_KEY
  }
}

export default Model
