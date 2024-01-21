import React from 'react'
import './styles/App.css'
import { useNavigate } from 'react-router-dom'

import Button from './components/Button'

function App() {
  const routeTo = useNavigate()
  return (
    <>
      <div className='homeWrapper'>
        <div className='homeBody'>
          <h2>Welcome to</h2>
          <h1>CHATINE</h1>
          <h2>Empowering Texts With Visuals</h2>
          <div className='bttnGrp'>
            <Button
              onClick={() => routeTo('/login')}
              style={{ width: '250px' }}
            >
              Login
            </Button>
            <Button
              onClick={() => routeTo('/sign-up')}
              style={{ width: '250px' }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
