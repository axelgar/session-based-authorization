'use strict';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dv6jxstce',
  api_key: '899768461587241',
  api_secret: 'qj2MuRYRc1T0tmt8a82Ssbcr49M'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'recipes',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser
;
