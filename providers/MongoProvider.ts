import { ApplicationContract } from '@ioc:Adonis/Core/Application'
// import { AuthService } from 'App/'
import mongoose from 'mongoose'
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class MongoProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    mongoose.connect('mongodb://localhost:27017/test').then(() => {
      console.log('mongo started')
    })
    this.app.container.singleton('Mongoose', () => mongoose)
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
    mongoose.disconnect()
  }
}
