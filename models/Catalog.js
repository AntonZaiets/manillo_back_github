import mongoose from 'mongoose'

const CatalogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    tags: {
        type: Array,
        default: []
    },
    // colors: {
    //     type: Array,
    //     default: []
    // },
    // size: {
    //     type: Array,
    //     default: []
    // },
    viewsCount: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: Array,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
});

export default mongoose.model('Catalog', CatalogSchema)