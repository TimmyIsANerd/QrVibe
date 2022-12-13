module.exports = {
  friendlyName: 'Login',

  description: 'Login Page',

  inputs: {},

  exits: {},

  fn: async function () {
    return sails.inertia.render('auth/login', {
      name: 'QrVibe | Login',
    })
  },
}
