import React, { useEffect } from 'react'
import './styles/Verified.css'
import { useNavigate } from 'react-router-dom'

const Verified = () => {
  const routeTo = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      routeTo('/login')
    }, 5000)
  })

  useEffect(() => {
    document.title = 'Chatine - Email Verified'
  })

  return (
    <div className='verifiedWrapper'>
      <div className='verifiedBody'>
        <img src='/SuccessfulTick.png' alt='greenTick' width={75} />
        <h2>EMAIL VERIFIED</h2>

        <p>
          Thanks for verifying your email. Redirecting to loging page shortly...
        </p>
      </div>
    </div>
  )
}

export default Verified
