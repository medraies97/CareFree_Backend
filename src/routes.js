const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
  next();
});
router.get('/', (req, res) => {
  res.json({
    message: 'Home',
  });
});


module.exports = router;
