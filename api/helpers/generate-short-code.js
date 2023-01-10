module.exports = {
  friendlyName: 'Generate short code',

  description: '',

  inputs: {
    characterLength: {
      type: 'number',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ characterLength }) {
    var shortCode = ''

    var charset = 'abcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < characterLength; i++) {
      shortCode += charset(Math.floor(Math.random * charset.length))

      return shortCode
    }
  },
}
