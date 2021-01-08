const express = require('express');
const router = express.Router();

module.exports = (firebase) => {

  // add appointment for Doctor
  router.post('/:doctor_id/add', (req, res) => {
    let newAppointment = firebase.database().ref(`doctor/${req.params.doctor_id}/appointments`).push()
    newAppointment.set(req.body).then(response => {
      res.json(response);
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });


  // Update appointment for Doctor
  router.put('/:doctor_id/:appointment_id', (req, res) => {
    firebase.database().ref(`doctor/${req.params.doctor_id}/appointments/${req.params.appointment_id}`).set(req.body).then(response => {
      res.json(response);
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });

  // delete appointment for Doctor
  router.delete('/:doctor_id/:appointment_id', (req, res) => {
    let newAppointment = firebase.database().ref(`doctor/${req.params.doctor_id}/appointments/${req.params.appointment_id}`).remove().then(response => {
      res.json(response);
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage,
        },
      });
    });
  });
  return router;
};
