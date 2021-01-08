module.exports = (admin) => {
  return function (req, res, next) {
    if (!req.headers.access_token) {
      res.status(401).send()
    }
    const user = admin.auth().verifyIdToken(req.headers.access_token).then(decodedToken => {
      req.user_id = decodedToken.uid
      next()
    }).catch(error => {
      console.error(error)
      res.status(401).send()
    })

  }
}