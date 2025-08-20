import React, { useState } from 'react'
import ImagePreview from './ImagePreview'
import ImageUpload from './ImageUpload'
import { getEnhancedImage } from '../utils/getEnhancedImage'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [upLoadedImage, setUpLoadedImage] = useState(null)
    const [enhancedImage, setEnhancedImage] = useState(null)

    const getUpLoadedImage = async(image)=>{
        setUpLoadedImage(URL.createObjectURL(image));
        setLoading(true);
        try{
            const enhancedImageUrl = await getEnhancedImage(image);
            // console.log('HOME ENHANCED URL : ',enhancedImageUrl)
            setEnhancedImage(enhancedImageUrl?.image);
            setLoading(false);
        }catch(error){
            console.log(error)
        }
    }
    // console.log('HOMEE !!!! : ',enhancedImage);
  return (
    <>
        <ImageUpload
        getUpLoadedImage={getUpLoadedImage}
        />
        <ImagePreview
        loading={loading}
        upLoadedImage={upLoadedImage}
        enhancedImage={enhancedImage}
        />
    </>
  )
}

export default Home