/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/user', async ({ request }) => {
  const data = request.only(['email', 'password', 'name'])
  const user = new User({
    ...data,
  })
  return await user.save()
})

Route.post('/login', async ({ auth, request }) => {
  const { email, password } = request.only(['email', 'password'])
  const tokens = await auth.attempt(email, password)
  return {
    ...tokens,
    user: auth.user,
  }
})
