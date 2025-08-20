
const ImageUpload = (props) => {
    const handleImageChange = (e)=>{
        const file = e.target.files?.[0];
        if(file){
            props.getUpLoadedImage(file);
        }
    }
  return (
    <div className="bg-white shadow-xl rounded-2xl w-full p-6 max-w-2xl">
      <label
        htmlFor="fileInput"
        className="block w-full border-2 border-dashed border-gray-500 text-center rounded-lg transition-all cursor-pointer p-6 hover:border-blue-700"
      >
        <input type="file" id="fileInput" className="hidden" onChange={handleImageChange}/>
        <span className="text-lg text-gray-700">Click and drag to upload your image</span>
      </label>
    </div>
  )
}

export default ImageUpload