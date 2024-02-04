import React, { useEffect, useRef, useState } from 'react'
import './styles/Chat.css'
import './styles/ScrollBar.css'
import './styles/component-styles/SweetAlert.css'
import UploadProfilePhoto from './components/UploadProfilePhoto'
import Button from './components/Button'
import TextField from './components/TextField'
import axios from 'axios'
import urls from './urls'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const routeTo = useNavigate()
  const userId = localStorage.getItem('userID')

  const [togglePanel, setTogglePanel] = useState(false)
  const [toggleImageGenerator, setToggleImageGenerator] = useState(false)
  const [toggleNameUpdater, setToggleNameUpdater] = useState(false)
  const [nameUpdater, setNameUpdater] = useState('')
  const [userData, setUserData] = useState({
    fullName: '',
    profilePicture: '',
    username: '',
    about: '',
    _id: '',
  })
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [activeChat, setActiveChat] = useState({})
  const [messageToSend, setMessageToSend] = useState('')
  const [conversationID, setConversationID] = useState('')

  const [uploadedPhoto, setUploadedPhoto] = useState('')
  const [uploadLoader, setUploadLoader] = useState(false)

  const divRef = useRef(null)

  // Call scrollToBottom whenever the content of your div changes
  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

  useEffect(() => {
    setTimeout(() => {
      !!conversationID && getMessages(conversationID)
    }, 2000)
  }, [messages, conversationID])

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }

  const handleLogout = () => {
    routeTo('/login')
    localStorage.removeItem('userID')
  }

  const getMessages = (conversationId) => {
    // setMessages([])
    if (!!conversationId)
      axios
        .post(`${urls}/api/message/getMessages`, { conversationId })
        .then((res) => {
          const chatMessages = res.data.messages

          setMessages(chatMessages)

          // setTimeout(() => {
          //   getMessages(conversationId)
          // }, 1000)
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

  const getChats = () => {
    axios
      .post(`${urls}/api/conversation/getUserConversations`, { userId })
      .then((res) => {
        const chats = res.data.conversations

        setChats(chats)
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

  const updateFullName = () => {
    axios
      .post(`${urls}/api/user/update/fullName`, {
        fullName: nameUpdater,
        _id: userId,
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${res.data.message}`,
          customClass: {
            confirmButton: 'primary',
          },
          buttonsStyling: false,
        })
        setToggleNameUpdater(false)
        getUserData()
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

  const sendMessage = async (conversationId) => {
    setMessageToSend('')

    if (toggleImageGenerator) {
      //Code to generate image and send message

      console.log(messageToSend)
    } else {
      const messageFormData = new FormData()
      messageFormData.append('conversationId', conversationId) // base64String is your base64-encoded image
      messageFormData.append('senderId', userId)
      messageFormData.append('content', messageToSend) // base64String is your base64-encoded image
      messageFormData.append('isImg', toggleImageGenerator)

      axios
        .post(`${urls}/api/message/send`, messageFormData)
        .then((res) => {
          getMessages(conversationId)
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
              onClick={() => {
                setTogglePanel(true)
                setToggleNameUpdater(false)
              }}
            />
            <h3>Welcome, {userData?.fullName}</h3>
          </div>
          {/* Chat's Search Bar */}
          {/* <div className='chatSearch'>
            <input type='text' />
            <img src='/search.svg' alt='search' width={30} />
          </div> */}
          {/* Chat List Box */}
          <div className='chatList'>
            {/* Chats*/}
            {chats?.map((chat, index) => (
              <div
                className='chat'
                key={index}
                onClick={() => {
                  setActiveChat(chat)
                  setConversationID(chat.conversationID)
                  // getMessages(chat.conversationID)
                }}
              >
                <img
                  src={
                    !!chat.profilePicture
                      ? chat.profilePicture
                      : '/NoProfilePhoto.png'
                  }
                  alt=''
                  width={45}
                />
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
                {toggleNameUpdater ? (
                  <>
                    <input
                      value={nameUpdater}
                      onChange={(e) => setNameUpdater(e.target.value)}
                    />
                    <div className='iconsGrp'>
                      <img
                        src='/cross.svg'
                        alt=''
                        width={30}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setToggleNameUpdater(false)
                        }}
                      />
                      <img
                        src='/tick.svg'
                        alt=''
                        width={30}
                        style={{ cursor: 'pointer' }}
                        onClick={updateFullName}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <span>{userData?.fullName}</span>

                    <img
                      src='/edit.svg'
                      alt=''
                      width={25}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setToggleNameUpdater(true)
                        setNameUpdater(userData?.fullName)
                      }}
                    />
                  </>
                )}
              </div>
              <div className='infoText'>
                This is not your username or pin. This name will be visible to
                your Chatine friends.
              </div>
              <div className='about'>{userData?.about}</div>
            </div>
            <span className='logoutButton' onClick={handleLogout}>
              Logout
            </span>
          </div>
        </div>
        <div className='right'>
          <div className='rightHead'>
            {!!activeChat?.profilePicture && (
              <>
                <img
                  src={
                    !!activeChat?.profilePicture
                      ? activeChat?.profilePicture
                      : '/NoProfilePhoto.png'
                  }
                  alt=''
                  width={50}
                />
              </>
            )}
            <h3>{activeChat?.fullName}</h3>
          </div>
          {/* Messages Wrapper */}
          <div className='messagesWrapper' ref={divRef}>
            {messages?.map((message, index) => (
              <span
                className={
                  userId === message.senderId
                    ? 'sentMessage'
                    : 'receivedMessage'
                }
                key={index}
              >
                {message.content}
              </span>
            ))}
          </div>
          {/* Chat's Right Footer */}
          <div className='chatTextBox'>
            <svg
              width='32px'
              // height='30px'
              viewBox='0 0 24 24'
              fill={toggleImageGenerator ? 'black' : 'yellow'}
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => setToggleImageGenerator(!toggleImageGenerator)}
              style={{
                cursor: 'pointer',
                backgroundColor: toggleImageGenerator ? 'green' : 'whitesmoke',
                borderRadius: 5,
              }}
            >
              <path
                // style={{ backgroundColor: 'red' }}
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z'
                fill={toggleImageGenerator ? 'white' : 'grey'}
              />
              <path
                d='M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z'
                fill={toggleImageGenerator ? 'white' : 'grey'}
              />
              <path
                d='M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z'
                fill={toggleImageGenerator ? 'white' : 'grey'}
              />
            </svg>
            <span style={{ display: toggleImageGenerator ? 'block' : 'none' }}>
              AI Generation Text:
            </span>
            <input
              value={messageToSend}
              type='text'
              onKeyDown={(e) => {
                if (e.key === 'Enter')
                  !!messageToSend && sendMessage(activeChat?.conversationID)
              }}
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
