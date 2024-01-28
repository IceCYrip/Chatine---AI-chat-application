import React from 'react'
import '../styles/component-styles/Button.css'

const Button = (props) => {
  const { style, onClick, onChange, type, color, ...otherProps } = props

  const buttonColor = {
    primary: { backgroundColor: '#2C5F7C', color: 'white' },
    secondary: { backgroundColor: '#9AB3BE', color: 'white' },
    error: { backgroundColor: 'red', color: 'white' },
    success: { backgroundColor: 'green', color: 'white' },
  }

  return (
    <button
      className='card'
      style={{
        backgroundColor:
          color && buttonColor[color]
            ? buttonColor[color].backgroundColor
            : buttonColor.primary.backgroundColor,
        color:
          color && buttonColor[color]
            ? buttonColor[color].color
            : buttonColor.primary.color,
        ...style,
      }}
      onClick={onClick}
      onChange={onChange}
      type={type}
      {...otherProps}
    >
      {!props.loading ? (
        props.children
      ) : (
        <img src='/Loader.svg' alt='Loader' width={25} />
      )}
    </button>
  )
}

export default Button
