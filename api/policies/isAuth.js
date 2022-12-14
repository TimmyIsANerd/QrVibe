module.exports = async function (req, res, proceed) {
  // Check if user is logged in
  const { url } = req

  if (url.includes('/dashboard')) {
    sails.log.info('Checking for session...')
    if (!req.session.userId) {
      sails.log.info('No Session Found')

      res.redirect('/login')
    }
  }

  if (url.includes('/login')) {
    sails.log.info('Checking for session...')
    if (req.session.userId) {
      sails.log.info('Session Found!')

      res.redirect('/dashboard')
    }
  }

  return proceed()
}
