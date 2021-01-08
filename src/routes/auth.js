const express = require('express');
const router = express.Router();

module.exports = (firebase) => {
  // Register
  router.post('/register', (req, res) => {
    const { email, password } = req.body
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      res.json(response)
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage
        }
      })
    })
  })

// Login
  router.post('/login', (req, res) => {
    const { email, password } = req.body
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      const user = response.user.toJSON()

      let docref = firebase.database().ref(`doctor`)
      docref.orderByChild('uid').equalTo(user.uid).once('value').then(resp => {
        console.log(resp.val())
        let userJson = {
          data: {...user.providerData[0] },
          ...user.stsTokenManager,
          id: user.uid
        }
        if (resp.val() !== null) {
          userJson.doctor = resp.val()
        }
        res.json(userJson)
      })
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage
        }
      })
    })
  })
  return router
}