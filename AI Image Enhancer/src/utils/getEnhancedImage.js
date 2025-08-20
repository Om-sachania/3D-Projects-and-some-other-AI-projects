import axios from "axios";

const API_KEY = 'wx5i0rlw7ufdz2pny'; // wx5i0rlw7ufdz2pny
const BASE_URL = "https://techhk.aoscdn.com/";

export const getEnhancedImage = async(imageFile)=>{
    try{
        // POST API
        // /api/tasks/visual/scale
        // console.log(imageFile);
        const taskId = await upLoadImage(imageFile)
        console.log('TAsk succcessful : ',taskId);


        // GET API
        // /api/tasks/visual/scale/{task_id}
        const enhancedImageData = await updatededImage(taskId);
        console.log("ENhanced  :",enhancedImageData);
        return enhancedImageData
    }
    catch(error){
        console.error(error)
    }
}

const upLoadImage = async(file)=>{
    const formData = new FormData();
    formData.append("image_file",file);

    const imageData = await axios.post(`${BASE_URL}/api/tasks/visual/scale`,formData,{
        headers : {
            "Content-Type" : "multipart/form-data",
            "X-API-KEY" : API_KEY
        },
    })

    // console.log(imageData);

        if(!imageData?.data?.data?.task_id){
            throw new Error("Failed to upload image !!!")
        }
        return imageData?.data?.data?.task_id;

}

const fetchEnhancedImage = async(taskId)=>{
    const imageData = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`,{
        headers : {
            "X-API-KEY" : API_KEY
        },
    })
    console.log(imageData?.data?.data);
    if(!imageData?.data?.data?.image){
        throw new Error("Failed to fetch enhanced image !!!")
    }
    return imageData?.data?.data;
}

const updatededImage = async(taskId,retries=0)=>{
    const result = await fetchEnhancedImage(taskId);
    console.log(result)

    if(result.state === 4 ){
        console.log('Processing')
        if(retries>=20){
            throw new Error("Reached max retries!!! Please try again.......")
        }

        await new Promise((resolve)=>setTimeout((resolve,2000)));

        return updatededImage(taskId,retries+1);
    }

    console.log("result : ",result);
    return result
}

// 'c47b4d74-935c-4e1b-8acb-d4502650506e'


// '1ae2ab51-af5c-4f6a-82c4-c88b35961bda'