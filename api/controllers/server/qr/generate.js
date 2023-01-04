module.exports = {
  friendlyName: 'Generate QR Code',

  description: 'Generate QR Code by specifying type',

  inputs: {
    link: {
      type: 'string',
    },
    qrCodeType: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Successfully Generated QR Code',
    },
  },

  fn: async function ({ link, qrCodeType }) {
    // Validate Input
    if (link === '' || qrCodeType === '') {
      return res.badRequest()
    }

    // Check  User Session

    const QrRecord = await QR.create({
      qrUser: await sails.helpers.getUserId(),
      link,
      shortCode: await sails.helpers.generateShortCode(),
    }).fetch()

    if (!QrRecord) {
      return res.recordCreationFailed()
    }
  },
}
