const express = require('express');
const userRouter = express.Router();
const multer = require('multer');

const multerConfig = require('../config/multer')
const postController = require('../controllers/postController');


userRouter.get('/', postController.list);
userRouter.post('/', multer(multerConfig).single('file'), postController.create);
userRouter.delete('/:id', postController.delete);

module.exports = userRouter;