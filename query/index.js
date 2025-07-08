const express = require('express')
const app = express();
const cors = require('cors')


app.use(express.json())
app.use(cors())


const posts = {}

app.get('/posts', (req, res, next) => {
    res.status(200).json(
        {
            status: "success",
            data: {
                posts: postsAndComments
            }
        }
    )
})


app.post('/events', (req, res, next) => {
    const { type, data } = req.body;
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = {
            title: title,
            comments: []
        }
    }

    if (type === 'CommentCreated') {
        const { commentId, postId, content } = data;
        posts[postId].comments.push({ commentId, content });
    }

    
})



const PORT = 8005;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})