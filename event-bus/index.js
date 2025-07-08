const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express();


app.use(express.json())
app.use(cors())

const services = {
    posts: {
        port: 8000
    },
    comments: {
        port: 8001
    },
    query: {
        port: 8002
    },
    event_bus: {
        port: 8005
    }
}


app.post('/events', async (req, res, next) => {
    const event = req.body;
    console.log(event)

    await axios.post(`http://localhost:${services.posts.port}/events`, event);
    await axios.post(`http://localhost:${services.comments.port}/events`, event)
    await axios.post(`http://localhost:${services.query.port}/events`, event)


    res.status(200).json({
        status: 'OK'
    }) 

})

const PORT = services.event_bus.port;
app.listen(PORT, () => {
    console.log(`event-bus: \n http://localhost:${PORT}`)
})