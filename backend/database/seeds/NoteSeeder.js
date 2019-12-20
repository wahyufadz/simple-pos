'use strict'

/*
|--------------------------------------------------------------------------
| NoteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Note', async (faker) => {
  return {
    title: faker.word(),
    content: faker.sentence(),
    user_id: Math.floor(Math.random() * 30) + 1
  }
})

class NoteSeeder {
  async run() {
    //create 300 random note
    await Factory
      .model('App/Models/Note')
      .createMany(300)
  }
}

module.exports = NoteSeeder
