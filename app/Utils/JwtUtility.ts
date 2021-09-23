import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import { IUser } from 'App/Models/User'

export interface ITokens {
  access_token: string
  refresh_token: string
}

export interface IGenerateTokenPayload {
  sub: string
}

export default class JwtUtility {
  public static async signRefresh(payload): Promise<string> {
    return await jwt.sign(payload, Env.get('APP_KEY'))
  }

  public static async signAccess(payload): Promise<string> {
    return await jwt.sign(payload, Env.get('APP_KEY'), { expiresIn: '15m' })
  }

  public static async verify(token: string): Promise<IUser | null> {
    return (await jwt.verify(token, Env.get('APP_KEY'))) as IUser | null
  }

  public static async generateTokens(
    payload: IGenerateTokenPayload,
  ): Promise<ITokens> {
    const refresh_token = await this.signRefresh(payload)
    const access_token = await this.signAccess(payload)
    return { refresh_token, access_token }
  }
}
