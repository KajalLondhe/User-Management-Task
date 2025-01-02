
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'

import UserDashboard from './Components/UserDashboard'
 import AdminDashboard from './Components/AdminDashboard'
import ProjectForm from './Components/ProjectForm'
import ProjectList from './Components/ProjectList'
import UpdateProject from './Components/UpdateProject,'
import ManageUsers from './Components/ManageUsers'
import UpdateUserProject from './Components/UpdateUserProject'

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/create-project' element={<ProjectForm/>}/>
      <Route path='/user-dashboard' element={<UserDashboard/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path="/projects" element={<ProjectList/>} />
      <Route path="/update-project/:id" element={<UpdateProject />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/updateuserproject/:id" element={<UpdateUserProject />} />
     
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
