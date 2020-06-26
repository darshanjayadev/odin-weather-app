import Controller from './modules/controller'
import Model from './modules/model'
import View from './modules/view'

const app = new Controller(new Model(), new View())

// Controller init
app.init()
