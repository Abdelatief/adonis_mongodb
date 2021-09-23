import Hash from '@ioc:Adonis/Core/Hash'
import mongoose from '@ioc:Mongoose'

export interface IUser {
  sub?: string
  refresh_token: string
  name: string
  email: string
  password: string
}

function deleteSensitiveData(doc, user) {
  delete user.password
}
const UserSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    email: String,
    password: String,
    refresh_token: String,
  },
  {
    toObject: {
      transform: deleteSensitiveData,
    },
    toJSON: {
      transform: deleteSensitiveData,
    },
  },
)

UserSchema.pre('save', async function () {
  if (this.password && this.isModified('password')) {
    this.password = await Hash.make(this.password)
  }
})

export default mongoose.model<IUser>('User', UserSchema)
