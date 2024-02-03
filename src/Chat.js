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
  const userId = localStorage.getItem('userID')

  const [togglePanel, setTogglePanel] = useState(false)
  const [userData, setUserData] = useState({
    fullName: '',
    profilePicture: '',
    username: '',
    _id: '',
  })
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [activeChat, setActiveChat] = useState({})
  const [messageToSend, setMessageToSend] = useState('')

  const [uploadedPhoto, setUploadedPhoto] = useState('')
  const [uploadLoader, setUploadLoader] = useState(false)

  useEffect(() => {
    if (!!userId) {
      getUserData()
      getChats()
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

  const handleLogout = () => {
    routeTo('/login')
    localStorage.removeItem('userID')
  }

  const getMessages = (conversationId) => {
    if (!!conversationId)
      axios
        .post(`${urls}/api/message/getMessages`, { conversationId })
        .then((res) => {
          const chatMessages = res.data.messages

          setMessages(chatMessages)
        })
  }

  const getChats = () => {
    axios
      .post(`${urls}/api/conversation/getUserConversations`, { userId })
      .then((res) => {
        const chats = res.data.conversations

        console.log('chatt', chats)
        setChats(chats)
      })
  }

  const getUserData = () => {
    axios
      .get(`${urls}/api/user/getUser/${userId}`)
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
    formData.append('image', uploadedPhoto) // base64String is your base64-encoded image
    formData.append('_id', userId)

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
        setUploadedPhoto('')
      })
      .catch((error) => console.error(error))
  }

  const sendMessage = (conversationId) => {
    console.log('conversationId', conversationId)

    const bodyForAPI = {
      conversationId,
      senderId: userId,
      content: messageToSend,
    }

    axios.post(`${urls}/api/message/send`, bodyForAPI).then((res) => {
      getMessages(conversationId)
      setMessageToSend('')
    })
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
            <img src='/search.svg' alt='search' width={30} />
          </div>
          {/* Chat List Box */}
          <div className='chatList'>
            {/* Chats*/}
            {chats?.map((chat, index) => (
              <div
                className='chat'
                key={index}
                onClick={() => {
                  setActiveChat(chat)
                  getMessages(chat.conversationID)
                }}
              >
                <img src={chat.profilePicture} alt='' width={45} />
                <span>{chat.fullName}</span>
              </div>
            ))}
          </div>

          <div
            className='profilePanel'
            style={{ left: togglePanel ? '0%' : '-101%' }}
          >
            <div>
              <div className='profileHead'>
                <img
                  src='/backIcon.svg'
                  alt=''
                  width={30}
                  onClick={() => setTogglePanel(false)}
                />
                <h3>Profile</h3>
              </div>
              <div className='profilePic'>
                <UploadProfilePhoto
                  width={100}
                  imageSrc={
                    !!uploadedPhoto
                      ? uploadedPhoto
                      : !!userData.profilePicture
                      ? userData.profilePicture
                      : '/NoProfilePhoto.png'
                  }
                  imageSetter={setUploadedPhoto}
                />
                {uploadedPhoto && (
                  <div className='buttonGrp'>
                    <Button
                      loading={uploadLoader}
                      // loading={true}
                      onClick={() => updateTheProfilePic()}
                    >
                      Update
                    </Button>
                    <Button color='error' onClick={() => setUploadedPhoto('')}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div className='fullname'>
                <span>Your name here</span>
                <img src='/edit.svg' alt='' width={20} />
              </div>
              <div className='infoText'>Some info text here</div>
              <div className='about'>Your about text here</div>
            </div>
            <span className='logoutButton' onClick={handleLogout}>
              Logout
            </span>
          </div>
        </div>
        <div className='right'>
          <div className='rightHead'>
            <img
              src={
                activeChat?.profilePicture
                // !!activeChat?.profilePicture
                //   ? activeChat?.profilePicture
                //   : '/NoProfilePhoto.png'
              }
              alt=''
              width={50}
            />
            <h3>{activeChat?.fullName}</h3>
          </div>
          {/* Messages Wrapper */}
          <div className='messagesWrapper'>
            {messages?.map((message) => (
              <span
                className={
                  userId == message.senderId ? 'sentMessage' : 'receivedMessage'
                }
              >
                {message.content}
              </span>
            ))}
          </div>
          {/* Chat's Right Footer */}
          <div className='chatTextBox'>
            <img
              src='/imageGenerator.svg'
              alt=''
              width={30}
              style={{ borderRadius: 0 }}
            />
            <input
              value={messageToSend}
              type='text'
              onChange={(e) => setMessageToSend(e.target.value)}
            />

            <img
              src='/sendIcon.svg'
              alt=''
              width={35}
              onClick={() => sendMessage(activeChat?.conversationID)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
