import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from '../api/routes/user.route.js'
import authRoute from '../api/routes/auth.route.js'
import postRoute from '../api/routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

mongoose.connect(process.env.MONOGO)
    .then(
        () => { console.log('Database is Connected'); }
    ).catch(err => {
        console.log(err);
    })

const __dirname = path.resolve()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
    console.log('Server is runing on port 3000!!');
})

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist/')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal sever error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})