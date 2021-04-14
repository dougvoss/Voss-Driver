const express = require('express');
const multer = require('multer');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

const router = express.Router();

router.get('/', (req,res) => {
    res.send({ 
        server: "voss-driver-api",
        version: "1.0.0"
     })
})

router.use('/users', userRouter);
router.use('/posts', postRouter);


module.exports = server => server.use('/api', router);