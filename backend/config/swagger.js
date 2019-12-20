'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  enable: true,
  // specUrl: '/swagger.json',

  options: {
    swaggerDefinition: {
      "info": {
        "title": "Noted App 💘 Swagger",
        "description": "This is a sample server swagger server.",
        "version": "1.0.0",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
          "email": "fadzar.wahyu@gmail.com"
        },
        "license": {
          "name": "Apache 2.0",
          "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
      },
      // "host": "api.fadzarwahyu.net",
      "host": "127.0.0.1:3333",
      "basePath": "/api/v1",
      "tags": [
        {
          "name": "auth",
          "description": "Authentication for user"
        },
        {
          "name": "note",
          "description": "Everything about your Note"
        }
      ],

      "securityDefinitions": {
        "Bearer": {
          "type": "apiKey",
          "name": "Authorization",
          "in": "header"
        }
      }
      // Example security definitions.
      // securityDefinitions: {
      //   ApiKey: {
      //     description: 'ApiKey description',
      //     name: 'Authorization'
      //   },

      // OAuth2 configuration
      // OAuth2: {
      //   authorizationUrl: 'https://example.com/oauth/authorize',
      //   tokenUrl: 'https://example.com/oauth/token',

      //   // define your scopes here
      //   // remove read, write and admin if not necessary
      //   scopes: {
      //     read: 'Grants read access (this is just sample)',
      //     write: 'Grants write access (this is just sample)',
      //     admin: 'Grants read and write access to administrative information (this is just sample)'
      //   }
      // },
      // }
    },
    apis: [
      'app/**/*.yml',
      'start/routes.js'
    ]
  }
}
