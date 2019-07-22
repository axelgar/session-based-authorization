'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.path);
  res.render('index', { title: 'Express' });
});

module.exports = router;
