import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONOGO)
    .then(
        () => { console.log('Database is Connected'); }
    ).catch(err => {
        console.log(err);
    })

const app = express()

app.listen(3000, () => {
    console.log('Server is runing on port 3000!!');
})