import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)
  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
      color={snap.color}
      disableAlpha
      presetColors={[
        '#6C7A89',
        '#4C9F9F',
        '#DFF6F0',
        '#E2725B',
        '#D4A73F',
        '#3C3C3C',
        '#EDE6DB',
        '#B2BEB5',
        '#B784A7',
        '#9CAF88',
        '#F6D1C1',
      ]}
      onChange={(color)=>state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker