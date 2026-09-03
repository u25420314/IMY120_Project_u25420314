const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.post("/api/signup", (req, res) =>{
    const {username, email, password} = req.body

    res.status(201).json({
        message: "Signup Successfull",
        user: {
            id: 1,
            username: username,
            email: email
        }
    })
})

app.post("/api/login", (req, res) =>{
    const {email, password} = req.body

    res.status(200).json({
        message: "Login Successfull",
        user: {
            id: 1,
            email: email
        }   
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})