import React, { useEffect, useState } from 'react'
import './styles/ForgotPassword.css'
import Button from './components/Button'
import TextField from './components/TextField'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import urls from './urls'

const ForgotPassword = () => {
  const routeTo = useNavigate()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Chatine - Forgot Password'
  }, [])

  const validator = () => {
    if (email === '') {
      const errorMessage = 'Please enter email'
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
      email,
    }
    setLoading(true)
    axios
      .post(`${urls}/api/auth/forgotPassword`, bodyForAPI)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          // text: `${res.data.message}`,
          text: `An email has been sent to you with instructions on how to reset your password`,
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
    <div className='forgotPasswordWrapper'>
      <div className='forgotPasswordBody'>
        <h2>FORGOT PASSWORD ?</h2>
        <span className='forgotPasswordInstructions'>
          Enter your registered email address to receive instructions to reset
          your password
        </span>
        <TextField
          fullwidth
          label='Email Address'
          onChange={(e) => setEmail(e.target.value)}
          type='text'
        />
        <Button
          style={{ width: '95%', marginTop: '15px', fontSize: 'large' }}
          onClick={validator}
          loading={loading}
          disabled={loading}
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
