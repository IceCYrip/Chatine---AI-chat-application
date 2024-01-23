import React, { useState } from 'react'
import './styles/Login.css'

import TextField from './components/TextField'
import Button from './components/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import urls from './urls'
import Modal from './components/Modal'

const Login = () => {
  const routeTo = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

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
            marginTop: '5px',

            fontSize: 'medium',
          }}
          // onClick={() => routeTo('/sign-up')}
          onClick={() => setModalOpen(!modalOpen)}
        >
          Create an account
        </Button>
      </div>
      <Modal open={modalOpen}>
        <div style={{ width: '100%' }}>
          <button onClick={() => setModalOpen(!modalOpen)}>close</button>
        </div>
      </Modal>
    </div>
  )
}

export default Login
