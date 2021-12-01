const express = require("express")
const app = express()

const mongoose = require("mongoose")
const helmet = require("helmet")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const userRoute = require("./routes/users")
const authRouter = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to mongoDB successfully")
});

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())


app.use("/api/users", userRoute)
app.use("/api/auth", authRouter)
app.use("/api/posts", postRoute)


app.listen(5000, () => {
    console.log("App listening on port 5000....")
})