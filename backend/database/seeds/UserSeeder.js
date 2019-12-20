'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: 'secret'
  }
})

class UserSeeder {
  async run() {
    //default user
    const u1 = new User()
    u1.username = 'usersatu'
    u1.email = 'u1@mail.com'
    u1.password = 'admin'
    await u1.save()

    //create 30 random user
    await Factory
      .model('App/Models/User')
      .createMany(30)
  }
}

module.exports = UserSeeder
