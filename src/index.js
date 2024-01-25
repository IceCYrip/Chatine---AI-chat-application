import React from 'react'
import './styles/index.css'

import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Verified from './Verified'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id?' element={<ResetPassword />} />
        <Route path='/verified/:id' element={<Verified />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
