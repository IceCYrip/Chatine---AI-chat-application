import React, { useEffect, useState } from 'react'
import './styles/ResetPassword.css'

import TextField from './components/TextField'
import Button from './components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import urls from './urls'

const ResetPassword = () => {
  const routeTo = useNavigate()
  const { id } = useParams()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!id)
  }, [id])

  useEffect(() => {
    document.title = 'Chatine - Reset Password'
  }, [])

  const validator = () => {
    if (!!newPassword && !!confirmPassword && newPassword === confirmPassword) {
      if (
        (isLoggedIn && oldPassword === '') ||
        newPassword === '' ||
        confirmPassword === ''
      ) {
        const errorMessage =
          !oldPassword && !newPassword && !confirmPassword
            ? 'Please fill all the fields'
            : !oldPassword
            ? 'Please enter old password'
            : !newPassword
            ? 'Please enter new password'
            : 'Please enter confirm password'
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
        text:
          !newPassword && !confirmPassword
            ? 'Password fields cannot be empty'
            : !newPassword
            ? 'Please enter new password'
            : !confirmPassword
            ? 'Please confirm the entered password'
            : 'Password and Confirm Password does not match',
        customClass: {
          confirmButton: 'primary',
        },
        buttonsStyling: false,
      })
    }
  }

  const authenticator = () => {
    const bodyForAPI = {
      _id: id ?? null,
      oldPassword,
      newPassword,
      isLoggedIn,
    }
    setLoading(true)
    axios
      .post(`${urls}/auth/resetPassword`, bodyForAPI)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed Successfully',
          // text: `${res.data.message}`,
          text: `Please login again with your new password`,
          customClass: {
            confirmButton: 'primary',
          },
          buttonsStyling: false,
        })
        routeTo('/login')
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
    <div className='resetPasswordWrapper'>
      <div className='resetPasswordBody'>
        <h2>Reset Password</h2>
        {isLoggedIn && (
          <TextField
            fullwidth
            label='Old Password'
            onChange={(e) => setOldPassword(e.target.value)}
            type='password'
          />
        )}
        <TextField
          fullwidth
          label='New Password'
          onChange={(e) => setNewPassword(e.target.value)}
          type='password'
        />
        <TextField
          fullwidth
          label='Confirm New Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          type='password'
        />

        <Button
          style={{ width: '100%', marginTop: '25px', fontSize: 'large' }}
          onClick={validator}
          disabled={loading}
          loading={loading}
        >
          Reset Password
        </Button>

        <Button
          color='secondary'
          style={{
            width: '50%',
            marginTop: '15px',
            fontSize: 'medium',
          }}
          onClick={() => routeTo('/sign-up')}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ResetPassword
