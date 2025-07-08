const express = require('express')
const app = express();
const axios = require('axios')

app.use(express.json())

app.post('/events', async (req, res, next) => {
    const bannedList = ["orange", "sex", "fucked up"]
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const banned = bannedList.some(word => data.content.includes(word));

        const status = banned ? 'rejected' : 'approved';

        // send it to the event bus
        await axios.post(`http://localhost:8005`, {
            type: "CommentModerated",
            data: {
                commentId: data.commentId,
                postId: data.postId,
                content: data.content,
                status
            }
        })
        return res.status(200).json(
            {
                message: "comment is moderated",
                status
            }
        )
    }

    return res.status(200).json(
        {
            status: "Event received"
        }
    )
})

const PORT = 8006
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})