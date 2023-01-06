module.exports = {
  friendlyName: 'New Password',
  description: 'Page with Form to set new Password',

  fn: async function ({}) {
    const { token } = this.req.params

    if (token === '' || !token) {
      return res.badRequest()
    }

    const user = await User.findOne({
      where: {
        passwordResetToken: token,
      },
      select: ['fullName', 'emailAddress'],
    })

    return sails.inertia.render('auth/new-password', {
      user,
    })
  },
}
