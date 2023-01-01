module.exports = {
  friendlyName: 'Change User Password',

  description: 'Change User Password',

  inputs: {
    oldPassword: {
      type: 'string',
      description: "User's old password",
    },
    newPassword: {
      type: 'string',
      description: "User's new password",
    },
  },

  exits: {
    success: {
      description:
        'The requesting user agent has been successfully changed their password',
    },
    badCombo: {
      description: `The provided email and password combination does not
          match any user in the database.`,
      responseType: 'unauthorized',
    },
  },

  fn: async function ({ oldPassword, newPassword }) {
    var userRecord = await User.findOne({ id: this.req.session.userId })

    if (!userRecord) {
      throw 'badCombo'
    }

    await sails.helpers.passwords
      .checkPassword(oldPassword, userRecord.password)
      .intercept('incorrect', 'badCombo')

    const updatedRecord = await User.updateOne({
      id: this.req.session.userId,
    }).set({
      password: await sails.helpers.passwords.hashPassword(newPassword),
    })

    
  },
}
