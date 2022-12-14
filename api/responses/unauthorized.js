/**
 * unauthorized.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.unauthorized();
 *     // -or-
 *     return res.unauthorized(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'unauthorized'
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

module.exports = function unauthorized(optionalData) {
  const req = this.req;
  const res = this.res;

  sails.log.verbose("Ran custom response: res.unauthorized()");

  sails.log.error(optionalData ? optionalData : `the provided email and password didn't match`);

  return res.status(401).json({
    status:'failed',
    message:optionalData ? optionalData : `The provided email and password didn't match`
  });
};
