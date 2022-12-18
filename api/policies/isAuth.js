module.exports = async function (req, res, proceed) {
  // Check if user is logged in
  const { url } = req

  if (url === '/') {
    if (req.session.userId) {
      sails.log.info('Session Found')

      res.redirect('/dashboard')
    }
  }

  if (url.includes('/dashboard')) {
    sails.log.info('Checking for session...')
    if (!req.session.userId) {
      sails.log.info('No Session Found')

      res.redirect('/login')
    }
  }

  return proceed()
}
