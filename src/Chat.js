import React, { useState } from 'react'
import './styles/Chat.css'
import './styles/ScrollBar.css'

const Chat = () => {
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

  const [togglePanel, setTogglePanel] = useState(false)

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
              src='/SuccessfulTick.png'
              alt=''
              width={50}
              onClick={() => setTogglePanel(true)}
            />
            <h3>Welcome, Karan Sable</h3>
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
              <img
                src='/SuccessfulTick.png'
                alt=''
                width={125}
                onClick={() => setTogglePanel(false)}
              />
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
