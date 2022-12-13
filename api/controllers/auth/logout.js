module.exports = {
  fn: async function () {
    // Removed Session ID
    this.req.session.userId = undefined

    this.res.redirect('/login')
  },
}
