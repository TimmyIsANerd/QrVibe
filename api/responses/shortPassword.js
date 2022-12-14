/**
 * auth/shortPassword.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.hortPassword();
 *     // -or-
 *     return res.shortPassword(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'auth/shortPassword'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function shortPassword(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.shortPassword()")

  sails.log.error("Password is less than 8 characters");

  res.status(401).json({
    status:'failed',
    message:'Password is less than 8 characters'
  });

};
