import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please providw all required fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id
    })

    try {
        const savePost = await newPost.save()
        res.status(200).json({
            success: true,
            post: savePost
        })

    } catch (error) {
        next(error)
    }
}

export const getposts = async (req, res, next) => {
    try {

        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.order === 'asc' ? 1 : -1
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        }).sort({ updateAt: sortDirection }).skip(startIndex).limit(limit)

        const totalPosts = await Post.countDocuments()
        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthPasts = await Post.countDocuments({
            createAt: { $gte: oneMonthAgo },
        })

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPasts
        })

    } catch (error) {
        next(error)
    }
}

export const deleteposts = async (req, res, next) => {
    console.log(req.params.userId, req.params.postId);
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'))
    }
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json('The post has been deleted')
    } catch (error) {
        next(error)
    }
}


export const updatepost = async (req, res, next) => {

    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this post'))
    }

    try {

        const updaetPost = await Post.findByIdAndUpdate(req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image
                }
            }, { new: true })

        res.status(200).json(updaetPost)

    } catch (error) {
        next(error)
    }
}