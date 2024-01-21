import React from 'react'
import './styles/SignUp.css'
import TextField from './components/TextField'
import Button from './components/Button'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='signUpWrapper'>
      <div className='signUpBody'>
        <h2>SIGN UP</h2>
        <TextField
          fullWidth
          label='Email Address'
          onChange={(e) => console.log('Email Address: ', e.target.value)}
        />
        <TextField
          fullWidth
          label='Username'
          onChange={(e) => console.log('Username: ', e.target.value)}
        />
        <TextField
          fullWidth
          label='Password'
          onChange={(e) => console.log('Password: ', e.target.value)}
          type='password'
        />
        <TextField
          fullWidth
          label='Confirm Password'
          onChange={(e) => console.log('Confirm Password: ', e.target.value)}
          type='password'
        />
        <Button style={{ width: '100%', marginTop: '25px' }} onClick={() => {}}>
          Sign Up
        </Button>
        <label className='alreadyHaveAcc'>
          Already Have an Account? <Link to={'/login'}>Login</Link>
        </label>
      </div>
    </div>
  )
}

export default SignUp
