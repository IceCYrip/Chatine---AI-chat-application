import React, { useEffect, useState } from 'react'
import './styles/Chat.css'
import './styles/ScrollBar.css'
import UploadProfilePhoto from './components/UploadProfilePhoto'
import Button from './components/Button'
import axios from 'axios'
import urls from './urls'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const routeTo = useNavigate()

  const [togglePanel, setTogglePanel] = useState(false)
  const [userData, setUserData] = useState({
    fullName: '',
    profilePicture: '',
    username: '',
    _id: '',
  })
  const [uploadedPhoto, setUploadedPhoto] = useState(false)
  const [uploadLoader, setUploadLoader] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('userID')) {
      getUserData()
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorised',
        text: `Please login first`,
        customClass: {
          confirmButton: 'primary',
        },
        buttonsStyling: false,
      })
      routeTo('/login')
    }
  }, [])

  const chats = [
    {
      name: 'Karan Sable',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Isha Lal',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Vidhi Prajapati',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Karan Sable',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Isha Lal',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Vidhi Prajapati',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Karan Sable',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Isha Lal',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Vidhi Prajapati',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Karan Sable',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Isha Lal',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Vidhi Prajapati',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Karan Sable',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Isha Lal',
      image: '/SuccessfulTick.png',
    },
    {
      name: 'Vidhi Prajapati',
      image: '/SuccessfulTick.png',
    },
  ]

  const getUserData = () => {
    axios
      .get(`${urls}/api/user/getUser/${localStorage.getItem('userID')}`)
      .then((res) => {
        setUserData(res.data)
      })
      .catch((error) =>
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: `${error.message}`,
          customClass: {
            confirmButton: 'error',
          },
          buttonsStyling: false,
        })
      )
  }

  const updateTheProfilePic = () => {
    setUploadLoader(true)
    const formData = new FormData()
    formData.append('image', userData.profilePicture) // base64String is your base64-encoded image
    formData.append('_id', localStorage.getItem('userID'))

    axios
      .post(`${urls}/api/user/update/profilePicture`, formData)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated',
          text: `${res.data.message}`,
          customClass: {
            confirmButton: 'primary',
          },
          buttonsStyling: false,
        })

        getUserData()

        setUploadLoader(false)
        setUploadedPhoto(false)
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className='chatWrapper'>
      {/* Blue background */}
      <div className='accentBackground' />
      {/* Chat's center screen */}
      <div className='chatBody'>
        {/* Chat's Left Column */}
        <div className='left'>
          {/* Chat's Left Header */}
          <div className='leftHead'>
            <img
              src={
                !!userData.profilePicture
                  ? userData.profilePicture
                  : '/NoProfilePhoto.png'
              }
              alt=''
              width={50}
              onClick={() => setTogglePanel(true)}
            />
            <h3>Welcome, {userData?.fullName}</h3>
          </div>
          {/* Chat's Search Bar */}
          <div className='chatSearch'>
            <input type='text' />
            <img src='/SuccessfulTick.png' alt='search' width={30} />
          </div>
          {/* Chat List Box */}
          <div className='chatList'>
            {/* Chats*/}
            {chats?.map((chat, index) => (
              <div className='chat' key={index}>
                <img src={chat.image} alt='' width={45} />
                <span>{chat.name}</span>
              </div>
            ))}
          </div>

          <div
            className='profilePanel'
            style={{ left: togglePanel ? '0%' : '-100%' }}
          >
            <div className='profileHead'>
              <img
                src='/SuccessfulTick.png'
                alt=''
                width={50}
                onClick={() => setTogglePanel(false)}
              />
              <h3>Profile</h3>
            </div>
            <div className='profilePic'>
              {/* <img
                src='/SuccessfulTick.png'
                alt=''
                width={125}
                onClick={() => setTogglePanel(false)}
              /> */}
              <UploadProfilePhoto
                width={100}
                // imageSrc={
                //   !!uploadedPhoto
                //     ? uploadedPhoto
                //     : !!userData.profilePicture
                //     ? userData.profilePicture
                //     : '/NoProfilePhoto.png'
                // }
                imageSrc={
                  !!userData.profilePicture
                    ? userData.profilePicture
                    : '/NoProfilePhoto.png'
                }
                // imageSetter={setUploadedPhoto}
                imageSetter={setUserData}
                isUploaded={setUploadedPhoto}
              />
              {uploadedPhoto && (
                <div className='buttonGrp'>
                  <Button
                    loading={uploadLoader}
                    onClick={() => updateTheProfilePic()}
                  >
                    Update
                  </Button>
                  <Button color='error' onClick={() => setUploadedPhoto(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            <div className='fullname'>Karan Sable</div>
            <div className='infoText'>Aandu Gundu Thanda Paani</div>
            <div className='about'>Karan Sable</div>
          </div>
        </div>
        <div className='right'>
          <div className='rightHead'>
            <img src='/SuccessfulTick.png' alt='' width={50} />
            <h3>Karan Sable</h3>
          </div>
          {/* Messages Wrapper */}
          <div className='messagesWrapper'></div>
          {/* Chat's Right Footer */}
          <div className='chatTextBox'>
            <img src='/SuccessfulTick.png' alt='' width={42} />
            <img src='/SuccessfulTick.png' alt='' width={42} />
            <input type='text' />

            <img src='/SuccessfulTick.png' alt='' width={42} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
