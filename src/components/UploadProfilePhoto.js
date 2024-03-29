import React from 'react'
import compressFile from '../utilities/imageCompression'

const UploadProfilePhoto = ({ imageSrc = '', imageSetter, width, height }) => {
  const handleCrop = (imageURL) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.onload = () => {
      const minDimension = Math.min(img.width, img.height)

      // Calculate the cropping coordinates to center the image
      const cropX = (img.width - minDimension) / 2
      const cropY = (img.height - minDimension) / 2

      // Set canvas size to the desired cropped size
      canvas.width = minDimension
      canvas.height = minDimension

      // Draw the cropped image on the canvas
      ctx.drawImage(
        img,
        cropX,
        cropY,
        minDimension,
        minDimension,
        0,
        0,
        minDimension,
        minDimension
      )

      // Convert the canvas content to a data URL
      const croppedImageBase64 = canvas.toDataURL('image/jpeg') // You can use other formats like 'image/png' if needed

      // imageSetter(croppedImageBase64)
      imageSetter(croppedImageBase64)
    }

    // img.src = image
    img.src = imageURL
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]

    const compressedImage = await compressFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        // setImage(reader.result)
        handleCrop(reader.result)
      }
      reader.readAsDataURL(compressedImage)
    }
  }

  return (
    <div>
      <input id='uploadFile' type='file' onChange={handleFileChange} hidden />

      {imageSrc && (
        <label htmlFor='uploadFile'>
          <img
            src={imageSrc}
            alt='Profile Pic'
            width={width ?? 'auto'}
            height={height ?? 'auto'}
            style={{
              border: '5px solid #164863',
              borderRadius: '50%',
              padding: '4px',
              cursor: 'pointer',
            }}
          />
        </label>
      )}
    </div>
  )
}

export default UploadProfilePhoto
