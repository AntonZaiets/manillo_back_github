import CatalogModel from '../models/Catalog.js'

export const getAll = async (req, res) => {
    try {
        const posts = await CatalogModel.find().populate('user').exec()
        res.json(posts)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getLastTags = async (req, res) => {
    try {
        const posts = await CatalogModel.find().limit(5).exec()
        const tags = posts.map(item => item.tags).flat().slice(0, 5)
        res.json(tags)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        let doc = await CatalogModel.findOneAndUpdate(
            {
                _id: postId
            }, {
                $inc: {viewsCount: 1},
            }, {
                returnDocument: "after"
            }
        )
        if(!doc){
            return res.status(500).json({
                message: 'Статья не найдена'
            })
        }
        res.json(doc)

    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        let doc = await CatalogModel.findOneAndDelete(
            {
                _id: postId
            }
        )
        if(!doc){
            return res.status(500).json({
                message: 'Статья не найдена'
            })
        }
        res.json({
            success: true
        })

    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const create = async (req, res) => {
    try{
        const doc = new CatalogModel({
            title: req.body.title,
            text: req.body.text,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            //size: req.body.size,
            //colors: req.body.colors,
            viewsCount: req.body.viewsCount,
            user: req.userId
        })

        const post = await doc.save()
        res.json(post)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось создать'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        let doc = await CatalogModel.findOneAndUpdate(
            {
                _id: postId
            }, {
                title: req.body.title,
                price: req.body.price,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                viewsCount: req.body.viewsCount,
                user: req.userId
            }
        )
        if(!doc){
            return res.status(500).json({
                message: 'Статья не найдена'
            })
        }
        res.json({
            success: true
        })

    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}