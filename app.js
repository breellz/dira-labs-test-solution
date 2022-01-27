const express = require('express')
const waitlistRouter = require('./src/routes/waitlist')
const app = express()

app.use(express.json())
app.use(waitlistRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => [
    console.log("app is listening on port " + port)
])