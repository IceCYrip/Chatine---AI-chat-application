import React, { useEffect } from 'react'
import '../styles/component-styles/Modal.css'

const Modal = ({ open, children }) => {
  useEffect(() => {
    document.body.setAttribute('style', `overflow: ${open ? 'hidden' : 'auto'}`)
  }, [open])

  return (
    <>
      {open && (
        <div
          className='modalWrapper'
          // style={{ opacity: open ? 1 : 0 }}
        >
          <div className='modal'>{children}</div>
        </div>
      )}
    </>
  )
}

export default Modal
