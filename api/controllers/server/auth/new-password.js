module.exports = {
  friendlyName: 'New Password',

  description: 'Set New Password',

  inputs: {
    emailAddress: {
      type: 'string',
    },
    newPassword: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Successfully set new password',
      statusCode: 200,
    },
  },

  fn: async function ({ emailAddress, newPassword }) {
    var res = this.res
    if (newPassword === '') {
      return res.badRequest()
    }

    if (newPassword.length < 8) {
      return res.shortPassword()
    }

    const userRecord = await User.findOne({
      where: {
        emailAddress: emailAddress,
      },
      select: ['id'],
    })

    if (!userRecord) {
      return res.badRequest()
    }

    const updatedRecord = await User.updateOne({ id: userRecord.id }).set({
      password: newPassword,
    })

    if (!updatedRecord) {
      return res.updateRecordFailed()
    }

    this.req.session.userId = updatedRecord.id

    if (sails.hooks.sockets) {
      await sails.helpers.broadcastSessionChange(this.req)
    }
  },
}
