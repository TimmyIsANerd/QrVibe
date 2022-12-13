module.exports = {
  friendlyName: 'Send verification email',

  description: 'Use Lim mailer to send verification email using template',

  inputs: {
    to: {
      description: 'The email address of the primary recipient.',
      extendedDescription:
        'If this is any address ending in "@example.com", then don\'t actually deliver the message. ' +
        'Instead, just log it to the console.',
      example: 'nola.thacker@example.com',
      required: true,
      isEmail: true,
    },
    subject: {
      description: 'The subject of the email.',
      example: 'Hello there.',
      defaultsTo: '',
    },
    from: {
      description:
        'An override for the default "from" email that\'s been configured.',
      example: 'anne.martin@example.com',
      isEmail: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Email delivery report',
      outputDescription: 'A dictionary of information about what went down.',
      outputType: {
        loggedInsteadOfSending: 'boolean',
      },
    },
  },

  fn: async function ({ to, subject }) {
    const { emailAddress, password, server, port } =
      sails.config.custom.smtpData

    const LimMailer = require('lim-mailer')
    const mailer = newLimMailer(
      {
        host: server,
        port,
        auth: {
          user: emailAddress,
          pass: password,
        },
        alias: 'Timmy',
      },
      {
        to: [to],
      }
    )(async () => {
      const info = await mailer.sendMail({
        subject: subject, // Subject line
        text: 'Verify your QR Vibe Account', // plain text body
        html: '<b>Verify QR Vibe Account</b>', // HTML body
      })
      console.log(info)
    })()
  },
}
