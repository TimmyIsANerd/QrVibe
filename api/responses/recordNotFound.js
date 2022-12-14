/**
 * recordNotFound.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.recordNotFound();
 *     // -or-
 *     return res.recordNotFound(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'recordNotFound'
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

module.exports = function recordNotFound(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  res.status(404).json({
    status:'failed',
    message:`${optionalData ? optionalData : "Record Not Found"}`
  })
};
