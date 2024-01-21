import React from 'react'
import './styles/Login.css'

import TextField from './components/TextField'
import Button from './components/Button'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const routeTo = useNavigate()
  return (
    <div className='loginWrapper'>
      <div className='loginBody'>
        <h2>LOGIN</h2>

        <TextField
          fullWidth
          // style={{ width: '325px' }}
          label='Username'
          onChange={(e) => console.log('Username: ', e.target.value)}
        />
        <TextField
          fullWidth
          // style={{ width: '325px' }}
          label='Password'
          onChange={(e) => console.log('Password: ', e.target.value)}
          type='password'
        />
        <div className='forgotPassWord'>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>

        <Button
          style={{ width: '100%', marginTop: '25px', fontSize: 'large' }}
          onClick={() => {}}
        >
          Login
        </Button>
        <label className='signUpForAcc'>Don't have an account?</label>
        <Button
          color='secondary'
          style={{
            width: '70%',
            marginTop: '15px',

            fontSize: 'medium',
          }}
          onClick={() => routeTo('/sign-up')}
        >
          Create an account
        </Button>
      </div>
    </div>
  )
}

export default Login
