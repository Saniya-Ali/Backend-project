import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

// accepting json
app.use(express.json({limit:"16kb"}))

// when we send something in url, urlencoding changes somethings such as ' '->'%' or '+'
app.use(express.urlencoded({extended:true, limit:"16kb"}))

// when we used to store public assets
app.use(express.static("public"))

// access and set cookies, crud operaions on secure cookies
app.use(cookieParser())

export {app}