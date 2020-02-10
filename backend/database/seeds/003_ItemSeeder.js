'use strict'

/*
|--------------------------------------------------------------------------
| ItemSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const itemType = ['grocery', 'snack', 'beverage']

Factory.blueprint('App/Models/Item', async (faker) => {
  return {
    name: faker.word(),
    description: faker.sentence(),
    user_id: Math.floor(Math.random() * 30) + 1,
    item_type: itemType[Math.floor(Math.random() * 2) + 1],
    sell_price: (Math.floor(Math.random() * 30) + 1) * 5000,
  }
})

class ItemSeeder {
  async run() {
    //create 300 random item
    await Factory
      .model('App/Models/Item')
      .createMany(300)
  }
}

module.exports = ItemSeeder
