import { Exception, HttpContext } from '@adonisjs/core/build/standalone'
import { UNAUTHORIZED_CODE } from 'App/Constants/codes'
import { UNAUTHORIZED_MESSAGE } from 'App/Constants/messages'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnauthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnauthorizedException extends Exception {
  constructor(message?: string) {
    super(message ?? UNAUTHORIZED_MESSAGE, 401, UNAUTHORIZED_CODE)
  }
  public async handle({ code, message }: this, ctx: HttpContext) {
    ctx.response.status(401).send({
      message,
      code,
    })
  }
}
