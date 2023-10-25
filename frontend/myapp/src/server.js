const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.use('/login', (req, res) => {
    res.send({
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjcmlzdGkiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjgzMTA5OTc0LCJleHAiOjE2ODMxOTYzNzR9.2iz-YvK8Y8sOM3_85d8L__6UTcUg-Ocn2lZiRDbaiNo'
    })
})

app.listen(8080, () => console.log('API is running on localhost:8080/login '))