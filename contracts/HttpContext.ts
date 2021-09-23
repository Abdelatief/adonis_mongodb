declare module '@ioc:Adonis/Core/HttpContext' {
  import { AuthService } from 'App/Services/AuthService'
  interface HttpContextContract {
    auth: AuthService
  }
}
