import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const porta = process.env.PORT ?? 3001
app.listen(porta, () =>{
    console.log(`Server is running on port ${porta}`)
})