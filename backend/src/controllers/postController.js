const Post = require('../models/Post');


module.exports = {
    async list (req,res) {
        try {
            const posts = await Post.find();
            return res.send(posts);
        } catch (err) {
            return res.status(401).send({ error: 'Cannot read posts'})
        }
    },
    async show (req,res) {
        const { key } = req.param;
        try {
            const posts = await Post.findOne({});
            return res.send(posts);
        } catch (err) {
            return res.status(401).send({ error: 'Cannot read a post'})
        }
    },
    async create(req, res) {
        try {
            const {
                originalname: name,
                size,
                key,
                location: url = ''
            } = req.file;
            const post = await Post.create({
                name,
                size,
                key,
                url
            });
    
            return res.send(post);
        } catch (err) {
            return res.status(401).send({ error: 'Cannot create a post, try again'})
        }
    },
    async delete (req,res) {
        try {
            const post = await Post.findById(req.params.id);

            await post.remove();

            return res.send();
        } catch (err) {
            return res.status(401).send({ error: 'Cannot delete post'})
        }
    },
}