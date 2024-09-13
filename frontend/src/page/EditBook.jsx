import React, { useEffect, useState } from 'react'
import axios from 'axios'

import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.author)
      setTitle(response.data.title)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      //alert('An error happend. Please check the console')
      console.log(error)
    })

  }, [])
  const handleEditBook = ()=>{
    const data ={
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios.put(`http://localhost:5555/books/${id}`, data)
    .then(() => {
      setLoading(false)
      enqueueSnackbar('Book Edited successfully', {variant: "success"})
      navigate('/')
    }).catch((error)=> {
      setLoading(false)
      //alert('An error happend. Please check console')
      enqueueSnackbar('Error', {variant: 'error'})
      console.log(error)
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-center my-10 text-slate-700 font-extrabold text-5xl'>Edit book</h1>
      {loading ? <Spinner/>: ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className="my-4">
        <label className='text-3xl mr-4 text-gray-500 px-4 py-2 w-full'>Title</label>
        <input type="text" 
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'
        />
        </div>
        <div className="my-4">
        <label className='text-3xl mr-4 text-gray-500 px-4 py-2 w-full'>Author</label>
        <input type="text" 
        value={author}
        onChange={(e)=> setAuthor(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'
        />
        </div>
        <div className="my-4">
        <label className='text-3xl mr-4 text-gray-500 px-4 py-2 w-full'>PublishYear</label>
        <input type="text" 
        value={publishYear}
        onChange={(e)=> setPublishYear(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'
        />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
   
    </div>
  )
}

export default EditBook





