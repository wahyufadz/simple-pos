'use strict'
const User = use('App/Models/User')

class AuthController {
  async register({ request, auth, response }) {
    const { username, email, password } = request.all()
    if (
      await User.findBy('email', email) == null
      && await User.findBy('username', username) == null
    ) {
      let newUser = new User()
      newUser.username = username
      newUser.email = email
      newUser.password = password
      await newUser.save()
      let accessToken = await auth.withRefreshToken().generate(newUser)
      accessToken.exp = Date.now()
      return response.json({ data: newUser, access_token: accessToken })
    } else {
      return response.json({ error: { message: 'Email or Username was registered' } })
    }
  }

  async login({ request, auth, response }) {
    const { email, password } = request.all()
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email),
          accessToken = await auth.withRefreshToken().generate(user)
        return response.json({ "data": user, "access_token": accessToken })
      }
    }
    catch (e) {
      return response.json({ error: { message: 'Email and Password not match' } })
    }
  }

  async logout({ auth }) {
    await auth.logout()
    return response.json({
      message: "user was logged out"
    })
  }

  async refresh({ auth, response }) {
    const refreshToken = request.input('refresh_token')

    return response.json({ "access_token": await auth.newRefreshToken().generateForRefreshToken(refreshToken) })
  }

  async checkEmailUsername({ request, response }) {
    const { type, data } = request.all()
    return response.json({
      message: await User.findBy(type, data)
        ? `${type} ${data} already registered`
        : `${type} ${data} can be used`
    })
  }
}

module.exports = AuthController
