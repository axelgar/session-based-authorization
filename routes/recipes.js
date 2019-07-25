'use strict';

const express = require('express');

const { isNotLoggedIn } = require('../middlewares/authMiddlewares.js');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const parser = require('../config/cloudinary');

const router = express.Router();

router.get('/create', isNotLoggedIn, (req, res, next) => {
  res.render('recipes/create');
});

router.use((req) => {
  console.log(req.body);
});

router.post('/create', isNotLoggedIn, parser.single('photo'), async (req, res, next) => {
  const { title, level, cuisine, duration } = req.body;
  const image = req.file.secure_url;
  try {
    const recipe = await Recipe.create({
      title,
      level,
      cuisine,
      duration,
      image
    });
    const recipeId = recipe._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { recipes: recipeId } });
    res.redirect('/users/private');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
