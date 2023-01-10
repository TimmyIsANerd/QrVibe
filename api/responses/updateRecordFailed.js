/**
 * updateRecordFailed.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.updateRecordFailed();
 *     // -or-
 *     return res.updateRecordFailed(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'updateRecordFailed'
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

module.exports = function updateRecordFailed(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  return res.status(409).json({
    status:'failed',
    message:'Failed to Update Record'
  })
  

};
