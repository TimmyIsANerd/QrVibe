module.exports = {
  friendlyName: 'Reset Password',

  description: 'Reset Password Login',

  inputs: {
    emailAddress: {
      type: 'string',
      description: 'The email of user attempting to reset password',
    },
  },

  exits: {
    success: {
      description:
        'The email is confirmed and reset code has been sent to email',
      statusCode: 200,
    },
  },

  fn: async function ({ emailAddress }) {
    var res = this.res

    if (emailAddress === '') {
      return res.badRequest()
    }

    const userRecord = await User.findOne({ emailAddress })

    if (!userRecord) {
      return res.recordNotFound(
        "Couldn't find an email associated to this account"
      )
    }

    const updatedRecord = await User.updateOne({ emailAddress }).set({
      passwordResetToken: await sails.helpers.strings.random('url-friendly'),
      passwordResetTokenExpiresAt:
        Date.now() + sails.config.custom.passwordResetTokenTTL,
    })

    //@todo add logic to send code to user's email address
    if (!updatedRecord) {
      return res.updateRecordFailed()
    }

    return res.status(200).json({ status: 'ok', message: 'Updated Password' })
  },
}
