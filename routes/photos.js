const { Router } = require('express');
const con = require('../models/connection')
const { getPhotos, createPhoto, updatePhoto, deletePhoto } = require('../controllers/photos.controller')

const router = Router();

router.get('/', getPhotos);

router.post('/', createPhoto);

router.put('/:id', updatePhoto);

router.delete('/:id', deletePhoto);

module.exports = router;