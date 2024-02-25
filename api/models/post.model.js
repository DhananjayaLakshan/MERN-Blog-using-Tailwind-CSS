import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        title: {
            type: String,
            unique: true
        },
        image: {
            type: String,
            default: 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png'
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        slug: {
            type: String,
            require: true,
            unique: true
        },



    }, { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
export default Post