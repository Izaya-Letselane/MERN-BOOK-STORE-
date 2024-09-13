import express from "express"
import { Book } from "../models/model.js"

const router = express.Router()
//Create a new book route

router.post('/', async (req, res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'send all requirewd fields: title, author, publishyear'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    } 
})
// Get all books from database
router.get('/', async (req, res)=>{
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data:books,
        })
    } catch (error) {
        console.log(error.message),
        res.status(500). send({message: error.message})
        
    }
})

// Get one book from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the book by ID
        const book = await Book.findById(id);

    
        // Respond with the found book
        return res.status(200).json(book);
    } catch (error) {
        // Log the error and respond with a 500 status
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

//Router for updating a book
router.put('/:id', async (req, res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'send all requirewd fields: title, author, publishyear'
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)
        if(!result){
            return res.status(200).json({message: 'Book Not Found'})
        }
        return res.status(200).send({message: 'Book updated successfully'})
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message }); 
    }
})

//Route for delete book
router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(200).json({message: 'Book Not Found'})
        }
        return res.status(200).send({message: 'Book deleted successfully'})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send({message: error.message})
        
    }
})

export default router
