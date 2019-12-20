'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello this is noted app API' }
})

Route.group(() => {
  Route.get('test', () => {
    return { greeting: 'this is only a test' }
  })

  Route.resource('notes', 'NoteController')
    .apiOnly()
    .middleware('auth')

  Route.post('/notes/page-search', 'NoteController.pageSearch')
    .middleware('auth')

  Route.post('/register', 'AuthController.register').prefix('auth')
  Route.post('/login', 'AuthController.login').prefix('auth')
  Route.post('/logout', 'AuthController.logout').prefix('auth')
  Route.post('/check-email-username', 'AuthController.checkEmailUsername').prefix('auth')

  Route.post('/refresh', 'AuthController.refresh').prefix('auth')


}).prefix('api/v1')
