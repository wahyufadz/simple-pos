'use strict'
const
  Note = use('App/Models/Note'),
  Database = use('Database')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notes
 */
class NoteController {
  /**
   * Show a list of all notes.
   * GET notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth }) {
    return response.json({
      data: await Note
        .query()
        .where('user_id', auth.user.id)
        .fetch()
    })
  }

  /**
   * Create/save a new note.
   * POST notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    if (!request.all().hasOwnProperty('title')) {
      return response.json({
        error: {
          message: 'Title field is required'
        }
      })
    }

    const
      newNote = new Note(),
      { title, content } = request.all()

    newNote.title = title
    newNote.content = content

    await newNote.save()

    return response.json({
      data: {
        newNote,
        message: 'data saved'
      }
    })

  }

  /**
   * Display a single note.
   * GET notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response, auth }) {
    const
      { id } = params,
      note = await Note
        .query()
        .where('id', id)
        .where('user_id', auth.user.id)
        .fetch()

    if (note.length) {
      return response.json({
        data: {
          note,
          message: 'data found',
        }
      })
    } else {
      return response.json({
        error: {
          message: 'data not found',
        }
      })
    }
  }

  /**
   * Update note details.
   * PUT or PATCH notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    if (!request.all().hasOwnProperty('title')) {
      return response.json({
        error: { message: 'Title field is required' }
      })
    }

    const
      { id } = params,
      note = await Note
        .find(id)

    if (!note) {
      return response.json({
        error: { message: 'data not found' }
      })
    } else if (note.user_id !== auth.user.id) {
      return response.json({
        error: { message: 'data not owned by user' }
      })
    }

    const { title, content } = request.all()
    note.title = title
    note.content = content
    note.save()

    return response.json({
      data: {
        note,
        message: 'data updated',
      }
    })

  }

  /**
   * Delete a note with id.
   * DELETE notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const
      { id } = params.all(),
      note = await Note.find(id)

    if (!note) {
      return response.json({
        error: { message: 'data not found' }
      })
    } else if (note.user_id !== auth.user.id) {
      return response.json({
        error: { message: 'data not owned by user' }
      })
    }

    await note.delete()
    return response.json({
      data: { message: 'data deleted' }
    })
  }

  /**
   * get user note with pagination.
   * POST notes/
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async pageSearch({ request, response, auth }) {
    let { page = 1, perPage = 5, orderBy = 'id', direction = 'asc' } = request.all()
    return response.json({
      data: await Database
        .table('notes')
        .where('user_id', auth.user.id)
        .orderBy(orderBy, direction)
        .paginate(page, perPage)
    })
  }
}

module.exports = NoteController
