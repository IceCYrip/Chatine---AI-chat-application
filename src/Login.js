import React, { useState } from 'react'
import './styles/Login.css'

import TextField from './components/TextField'
import Button from './components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import urls from './urls'

const Login = () => {
  const routeTo = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const authenticator = () => {
    const bodyForAPI = {
      email: username,
      password,
    }
    console.log('bodyForAPI: ', bodyForAPI)

    axios
      .post(`${urls}/api/auth/login`, bodyForAPI)
      .then((res) => {
        console.log('res: ', res)
        alert('Success')
      })
      .catch((error) => {
        console.error(error)
        alert('Invalid')
      })
  }

  return (
    <div className='loginWrapper'>
      <div className='loginBody'>
        <h2>LOGIN</h2>

        <TextField
          fullWidth
          label='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
        <div className='forgotPassWord'>
          <Link to='/forgot-password' state={{ login: false }}>
            Forgot Password?
          </Link>
        </div>

        <Button
          style={{ width: '100%', marginTop: '25px', fontSize: 'large' }}
          onClick={authenticator}
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
