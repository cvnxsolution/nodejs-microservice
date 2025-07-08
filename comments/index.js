const express = require('express')
const app = express();

const axios = require('axios')

const cors = require('cors')
const { randomBytes } = require("crypto")
app.use(express.json())
app.use(cors())

const commentsByPostId = {};

app.post('/posts/:id/comments', (req, res, next) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];
    const { content } = req.body;
    comments.push({ id: commentId, content: content });

    commentsByPostId[postId] = comments;

    axios.post('http://localhost:8005/events', {
        type: 'CommentCreated',
        data: {
            commentId,
            content,
            postId
        }
    })



    res.status(201).json(
        {
            status: "success",
            data: {
                comments
            }
        }
    )
})

app.post('/events', (req, res, next) => {
    console.log("Received events", req.body.type);
    res.send({})
})



app.get('/posts/:id/comments', (req, res, next) => {
    const comments = commentsByPostId[req.params.id] || [];
    res.status(200).json(
        {
            status: 'success',
            data: {
                comments
            }
        }
    )
})


const PORT = 8001;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})