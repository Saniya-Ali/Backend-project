// require('dotenv').config({path: './env'}) This will completely work but we want to maintain consistency so we will import
import dotenv from "dotenv" //This will not run like this, we have to write .config too
import connectDB from "./db/index.js"

dotenv.config({
    path: './.env'//be carefull with '.' in dotenv
})

connectDB()


// first approach
// import mongoose from 'mongoose'
// import {DB_NAME} from "./constants"

// import express from "express"

// const app=express()
// IIFI - Immediately invoked functions
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log("ERR: ", error)
//             throw error
//         })

//         app.listen(proces.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw error;
//     }
// })()