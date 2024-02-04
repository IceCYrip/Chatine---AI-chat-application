import React, { useEffect, useState } from 'react'
import './styles/Login.css'
import './styles/component-styles/SweetAlert.css'

import TextField from './components/TextField'
import Button from './components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import urls from './urls'
import Swal from 'sweetalert2'
// import Modal from './components/Modal'

const Login = () => {
  const routeTo = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Chatine - Login'
  }, [])

  const validator = () => {
    if (username === '' || password === '') {
      const errorMessage =
        !username && !password
          ? 'Please fill all the fields'
          : !username
          ? 'Please enter username'
          : 'Please enter password'
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: errorMessage,
        customClass: {
          confirmButton: 'primary',
        },
        buttonsStyling: false,
      })
    } else {
      authenticator()
    }
  }

  const authenticator = () => {
    const bodyForAPI = {
      username,
      password,
    }
    setLoading(true)
    axios
      .post(`${urls}/api/auth/login`, bodyForAPI)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `${res.data.message}`,
          customClass: {
            confirmButton: 'primary',
          },
          buttonsStyling: false,
        })

        localStorage.setItem('userID', res.data._id)
        routeTo('/chat')

        setLoading(false)
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${error.response.data.message}`,
          customClass: {
            confirmButton: 'primary',
          },
          buttonsStyling: false,
        })
        setLoading(false)
      })
  }

  return (
    <div className='loginWrapper'>
      <div className='loginBody'>
        <h2>LOGIN</h2>

        <TextField
          fullwidth='true'
          label='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullwidth='true'
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
        <div className='forgotPassWord'>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>

        <Button
          style={{ width: '100%', marginTop: '25px', fontSize: 'large' }}
          onClick={validator}
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
        <label className='signUpForAcc'>Don't have an account?</label>
        <Button
          color='secondary'
          style={{
            width: '70%',
            marginTop: '5px',
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
