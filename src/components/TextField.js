import React from 'react'
import '../styles/component-styles/TextField.css'

const TextField = (props) => {
  return (
    <div
      className='textFieldWrapper'
      style={props.fullwidth ? { width: '100%' } : {}}
    >
      <label className='textFieldLabel'>{props.label}</label>
      <input className='textFieldInput' {...props} />
    </div>
  )
}

export default TextField
