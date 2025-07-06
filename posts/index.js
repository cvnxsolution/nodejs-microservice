const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const app = express();

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

app.post('/posts', (req, res, next) => {
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');
    posts[id] = {
        id,
        title
    };

    console.log({
        status: 'success',
        data: {
            posts
        }
    })
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