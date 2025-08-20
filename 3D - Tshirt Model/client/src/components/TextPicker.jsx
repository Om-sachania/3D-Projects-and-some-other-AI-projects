import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import CustomButton from './CustomButton'

const TextPicker = ({ text, setText, handleSubmit }) => {
  const snap = useSnapshot(state)

  const handleTextChange = (e) => {
    setText(e.target.value)
    state.textProperties.text = e.target.value
  }

  const handleFontSizeChange = (e) => {
    state.textProperties.fontSize = parseInt(e.target.value)
  }

  const handleFontFamilyChange = (e) => {
    state.textProperties.fontFamily = e.target.value
  }

  const handleFontWeightChange = (e) => {
    state.textProperties.fontWeight = e.target.value
  }

  const handleTextColorChange = (e) => {
    state.textProperties.textColor = e.target.value
  }

  return (
    <div className='textpicker-container'>
      <div className='flex flex-col gap-3'>
        <textarea
          placeholder='Enter your text...'
          rows={3}
          value={text}
          onChange={handleTextChange}
          className='textpicker-textarea'
          maxLength={50}
        />
        
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <label className='text-xs text-gray-600'>Size:</label>
            <input
              type='range'
              min='12'
              max='48'
              value={snap.textProperties.fontSize}
              onChange={handleFontSizeChange}
              className='flex-1'
            />
            <span className='text-xs text-gray-600'>{snap.textProperties.fontSize}px</span>
          </div>

          <div className='flex items-center gap-2'>
            <label className='text-xs text-gray-600'>Font:</label>
            <select
              value={snap.textProperties.fontFamily}
              onChange={handleFontFamilyChange}
              className='flex-1 text-xs border border-gray-300 rounded px-1 py-1'
            >
              <option value='Arial'>Arial</option>
              <option value='Helvetica'>Helvetica</option>
              <option value='Times New Roman'>Times New Roman</option>
              <option value='Georgia'>Georgia</option>
              <option value='Verdana'>Verdana</option>
              <option value='Impact'>Impact</option>
            </select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='text-xs text-gray-600'>Weight:</label>
            <select
              value={snap.textProperties.fontWeight}
              onChange={handleFontWeightChange}
              className='flex-1 text-xs border border-gray-300 rounded px-1 py-1'
            >
              <option value='normal'>Normal</option>
              <option value='bold'>Bold</option>
            </select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='text-xs text-gray-600'>Color:</label>
            <input
              type='color'
              value={snap.textProperties.textColor}
              onChange={handleTextColorChange}
              className='w-8 h-6 border border-gray-300 rounded cursor-pointer'
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-2 mt-2'>
          <CustomButton
            type={'outline'}
            title={'Add Text'}
            handleClick={() => {
              console.log('Add Text clicked, text:', text);
              handleSubmit('text');
            }}
            customStyles={'text-xs'}
          />
        </div>
      </div>
    </div>
  )
}

export default TextPicker
