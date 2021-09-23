import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import User, { IUser } from 'App/Models/User'
import JwtUtility, { ITokens } from 'App/Utils/JwtUtility'
import Hash from '@ioc:Adonis/Core/Hash'
export class AuthService {
  public isLoggedIn: boolean = false
  public user: IUser | null = null

  public async login(user: IUser) {
    this.user = user
  }
  public async attempt(
    email: string,
    password: string,
  ): Promise<void | ITokens> {
    const user = await User.findOne({ email })
    if (!user) throw new UnauthorizedException()

    const isCorrectPassword = await Hash.verify(user.password, password)
    if (!isCorrectPassword) throw new UnauthorizedException()

    this.login(user)

    return await JwtUtility.generateTokens({ sub: user._id })
  }

  public async authenticate(token: string) {
    const decode = await JwtUtility.verify(token)
    if (!decode) throw new UnauthorizedException()

    const user = await User.findById(decode.sub)
    if (!user) throw new UnauthorizedException()
  }
}
