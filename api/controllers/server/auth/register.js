module.exports = {
  friendlyName: 'Register',

  description: 'Create New Account for QrVibe Users',

  inputs: {
    fullName: {
      type: 'string',
      description: "User's full Name",
      required: true,
    },

    emailAddress: {
      type: 'string',
      isEmail: true,
      unique: true,
      required: true,
      example: 'test@admin.com',
      description: 'the email address for the new account',
    },

    password: {
      type: 'string',
      maxLength: 200,
      example: 'passwordLol',
      minLength: 8,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'New user account was created successfully.',
    },

    invalid: {
      responseType: 'badRequest',
      description:
        'The provided fullName, password and/or email address are invalid.',
      extendedDescription:
        'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.',
    },

    emailAlreadyInUse: {
      responseType: 'emailAlreadyInUse',
      description: 'The provided email address / username is already in use.',
    },
  },

  fn: async function ({ fullName, emailAddress, password }) {
    var cleanEmail = emailAddress.toLowerCase()

    if (password.length < 8) {
      return res.shortPassword()
    }

    var userRecord = await User.create(
      _.extend(
        {
          fullName,
          emailAddress: cleanEmail,
          password: await sails.helpers.passwords.hashPassword(password),
          accountStatus: 'unverified',
        },
        sails.config.custom.verifyEmailAddress
          ? {
              emailProofToken: await sails.helpers.strings.random(
                'url-friendly'
              ),
              emailProofTokenExpiresAt:
                Date.now() + sails.config.custom.emailProofTokenTTL,
              emailStatus: 'unconfirmed',
            }
          : {}
      )
    )
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch()

    // Store the user's new id in their session.
    this.req.session.userId = userRecord.id

    if (sails.hooks.sockets) {
      await sails.helpers.broadcastSessionChange(this.req)
    }

    if (sails.config.custom.verifyEmailAddress) {
      await sails.helpers.sendVerificationEmail.with({
        to: cleanEmail,
        subject: 'Please Confirm your Account',
      })
    } else {
      sails.log.info(
        'Skipping new account email verification... (since `verifyEmailAddresses` is disabled)'
      )
    }
  },
}
