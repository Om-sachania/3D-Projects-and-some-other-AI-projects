import React from 'react'
import CustomeButton from './CustomButton';


const AIPicker = ({prompt,setPrompt,geeratingImg,handleSubmit}) => {
  
  return (
    <div className='aipicker-container'>
      <textarea
      placeholder='Ask AI...'
      rows={5}
      value={prompt}
      onChange={(e)=>setPrompt(e.target.value)}
      className='aipicker-textarea'
      />
      <div className='flex flex-wrap gap-3'>
        {
          geeratingImg ? (
            <CustomeButton
            type={'outline'}
            title={'Ask AI'}
            customStyles={'text-xs'}
            />
          ):(
          <>
            <CustomeButton 
            type={'outline'}
            title={"AI Logo"}
            handleClick={()=>handleSubmit('logo')}
            customStyles={'text-xs'}
            /> 
            <CustomeButton
            type={'filled'}
            title={"AI Full"}
            handleClick={()=>handleSubmit('full')}
            customStyles={'text-xs'}
            />
            </>
          )
        }
      </div>
    </div>
  )
}

export default AIPicker