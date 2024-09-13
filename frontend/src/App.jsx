import {Routes, Route} from 'react-router-dom'
import Home from './page/Home'

import EditBook from './page/EditBook'
import CreateBooks from './page/CreateBooks'
import ShowBook from './page/ShowBook'
import DeleteBook from './page/DeleteBook'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
    </Routes>
    
    </>
  )
}

export default App
