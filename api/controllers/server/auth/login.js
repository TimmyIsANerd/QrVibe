module.exports = {
  friendlyName: 'Login',

  description: 'Login Function',

  inputs: {
    emailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true,
    },

    password: {
      description:
        'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },
    badCombo: {
      description: `The provided email and password combination does not
        match any user in the database.`,
      responseType: 'unauthorized',
    },
  },

  fn: async function ({ emailAddress, password }) {
    var userRecord = await User.findOne({
      emailAddress: emailAddress.toLowerCase(),
    })

    if (!userRecord) {
      throw 'badCombo'
    }

    await sails.helpers.passwords
      .checkPassword(password, userRecord.password)
      .intercept('incorrect', 'badCombo')

    this.req.session.userId = userRecord.id

    if (sails.hooks.sockets) {
      await sails.helpers.broadcastSessionChange(this.req)
    }
  },
}
