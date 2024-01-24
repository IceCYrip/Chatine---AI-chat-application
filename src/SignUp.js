import React, { useState } from 'react'
import './styles/SignUp.css'
import TextField from './components/TextField'
import Button from './components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import urls from './urls'

const SignUp = () => {
  const routeTo = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const validator = () => {
    if (password == confirmPassword) {
      if (email == '' || password == '' || username == '') {
        const errorMessage =
          [email, username, password].filter((j) => !j).length > 1
            ? 'Please fill all the fields'
            : !username
            ? 'Please enter username'
            : !password
            ? 'Please enter password'
            : 'Please enter email'

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
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Password and Confirm Password does not match',
        customClass: {
          confirmButton: 'primary',
        },
        buttonsStyling: false,
      })
    }
  }

  const authenticator = () => {
    const bodyForAPI = {
      username,
      email,
      password,
    }
    setLoading(true)
    axios
      .post(`${urls}/api/auth/createUser`, bodyForAPI)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Sign Up Successful',
          text: `${res.data.message}`,
          customClass: {
            confirmButton: 'primary',
          },
          buttonsStyling: false,
        })
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
    <div className='signUpWrapper'>
      <div className='signUpBody'>
        <h2>SIGN UP</h2>
        <TextField
          fullwidth
          label='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullwidth
          label='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullwidth
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
        <TextField
          fullwidth
          label='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          type='password'
        />
        <Button
          style={{ width: '100%', marginTop: '25px', fontSize: 'large' }}
          onClick={validator}
          loading={loading}
          disabled={loading}
        >
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
