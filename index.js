import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import { registerValidation, loginValidation } from './validations/auth.js'
import { catalogCreateValidation } from './validations/catalog.js'
import { UserController, CatalogController, EmailController } from './controllers/index.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 4444
mongoose.connect(
    'mongodb+srv://alexdenisenko94:12345@cluster0.4zxfjoz.mongodb.net/blog?retryWrites=true&w=majority'
).then(()=>console.log('db ok')).catch(e => console.log('error', e))
app.listen(port, (err)=>{
    if(err){ return console.log(err)}
    console.log('Server Ok')
})
app.get('/', (req, res) => {
    res.send("Hello World");
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors,  UserController.login )
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register )
app.get('/auth/me', checkAuth, UserController.getMe )

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    console.log(req);
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/catalog', CatalogController.getAll)
app.get('/tags', CatalogController.getLastTags)
app.get('/catalog/:id', CatalogController.getOne)
app.post('/catalog', checkAuth, catalogCreateValidation, handleValidationErrors,  CatalogController.create )
app.delete('/catalog/:id', checkAuth, CatalogController.remove)
app.patch('/catalog/:id', checkAuth, catalogCreateValidation, handleValidationErrors,  CatalogController.update)

app.post('/send/email', EmailController.send)

