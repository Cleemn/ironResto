const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.status(400).json({page:'index'});
});

module.exports = router;
