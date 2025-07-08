const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const app = express();
const axios = require('axios')

app.use(express.json());
app.use(cors())


const posts = {};

app.get('/posts', (req, res, next) => {
    return res.status(200).json(
        {
            status: 'success',
            data: {
                posts
            }
        }
    )
})

app.post('/events', (req, res, next) => {
    console.log("Received events", req.body.type);
    res.send({})
})

app.post('/posts', async (req, res, next) => {

    console.log('posts requested')
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');
    posts[id] = {
        id,
        title
    };

    // await axios.post(`http://localhost:8005/events`, {
    //     type: 'PostCreated',
    //     data: { id, title }
    // })

    res.status(201).json(
        {
            status: 'success',
            data: {
                posts
            }
        }
    )
})



const PORT = 8000;

app.listen(8000, () => {
    console.log(`http://localhost:${PORT}`);
})