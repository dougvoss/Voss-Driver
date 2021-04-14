require('dotenv').config();
const mongoose = require('../database');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
    thumbnail: String,
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

PostSchema.pre('save', function () {
    if (!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
})

PostSchema.pre('remove', function () {
    if(process.env.STORAGE_TYPE === 's3'){
        try {
            return s3.deleteObject({
                Bucket: process.env.AWS_BUCKET, 
                Key: this.key,
            }).promise();
        } catch (err) {
            console.log({ error: 'Cannot remove from s3', err})
        }
        
    } else {
        return promisify(fs.unlink)(path.resolve( __dirname, '..', '..', 'tmp', 'uploads', this.key ))
    }
})


module.exports = mongoose.model('Posts', PostSchema);