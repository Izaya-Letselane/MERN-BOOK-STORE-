import express, { request, response } from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/model.js"
import booksRoute from './routes/bookRoute.js'
import cors from 'cors'
//QXMxVJKXtxp2THPQ
const app = express()
//middleware for parsing request body

app.use(express.json())

//Middleware for hanhling CORS POLICY
//OPTION 1: Allow All Origins with Default of cors(*)

app.use(cors())
/*OPTION 1: Allow custom Origins
    app.use(
        (cors({
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-type']
        }))
    )
*/
app.get('/', (req, res)=>{
    console.log(req)
    return res.status(234).send('Welcom to mern stack')
})

app.use('/books', booksRoute)


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database')
    app.listen(PORT, ()=>{
        console.log(`APP is litening to port: ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})