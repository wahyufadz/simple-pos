'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up() {
    this.create('items', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('item_type')
      table.integer('sell_price')
      table.text('description')
      table.integer('user_id')
        .unsigned()
      table.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('items')
  }
}

module.exports = ItemSchema
