/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/
  'GET /': 'home/index',
  'GET /example': 'example/index',
  'GET /login': 'auth/login',
  'GET /logout': 'auth/logout',
  'GET /dashboard': 'dashboard/index',
  'GET /reset/password': 'auth/reset',
  'GET /new/password/:token': 'auth/new-password',
  // AUTH
  'POST /register': 'server/auth/register',
  'POST /login': 'server/auth/login',
  'POST /reset/password': 'server/auth/reset',
  'POST /new/password': 'server/auth/new-password',
  // Generate QR Code
  'POST /generate': 'server/qr/generate',
  'DELETE /qr/:id': 'server/qr/delete',
}
