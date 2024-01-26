import React from 'react'
import './styles/Chat.css'

const Chat = () => {
  return (
    <div className='chatWrapper'>
      <div className='accentBackground' />
      <div className='chatBody'>
        <div className='left'>
          <div className='leftHead'>
            <img src='/SuccessfulTick.png' alt='' width={50} />
            <h3>Welcome, Karan Sable</h3>
          </div>
          <div className='chatSearch'>
            <input type='text' />
            <img src='/SuccessfulTick.png' alt='search' width={30} />
          </div>
          <div className='chatList'>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Karan Sable</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Vidhi Prajapati</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
            {/* Some comment*/}
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
            <div className='chat'>
              <img src='/SuccessfulTick.png' alt='' width={45} />
              <label>Isha Lal</label>
            </div>
          </div>
        </div>
        <div className='right'></div>
      </div>
    </div>
  )
}

export default Chat
