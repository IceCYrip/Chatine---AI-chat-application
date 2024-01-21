import React from 'react'
import './styles/ForgotPassword.css'
import Button from './components/Button'
import TextField from './components/TextField'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ForgotPassword = () => {
  const routeTo = useNavigate()

  const { state } = useLocation()

  useEffect(() => {
    console.log('state: ', state)
  }, [state])

  return (
    <div className='forgotPasswordWrapper'>
      <div className='forgotPasswordBody'>
        <h2>FORGOT PASSWORD ?</h2>
        <span className='forgotPasswordInstructions'>
          Enter your registered email address to receive instructions to reset
          your password
        </span>
        <TextField
          fullWidth
          label='Email Address'
          onChange={(e) => console.log('Password: ', e.target.value)}
          type='password'
        />
        <Button
          style={{ width: '95%', marginTop: '15px', fontSize: 'large' }}
          onClick={() => {}}
        >
          Login
        </Button>
        <Button
          color='secondary'
          style={{ width: '50%', marginTop: '15px', fontSize: 'medium' }}
          onClick={() => {
            routeTo('/login')
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ForgotPassword
