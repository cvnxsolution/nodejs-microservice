const express = require('express')
const app = express();

const cors = require('cors')
const { randomBytes } = require("crypto")
app.use(express.json())
app.use(cors)

const comments = {};

app.post('/posts/:id/comments', (req, res, next) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body;

    const comments = comments[req.params.id] || [];
    comments.push({ id: commentId, content })
    comments[req.params.id] = comments;

    return res.status(201).json(
        {
            status: "success",
            data: {
                created: comments
            }
        }
    )

})

app.get('/posts/:id/comments', (req, res, next) => {
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