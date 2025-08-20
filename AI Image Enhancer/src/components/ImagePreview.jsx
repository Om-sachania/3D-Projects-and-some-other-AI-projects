import Loading from "./Loading";

const ImagePreview = ({loading,upLoadedImage,enhancedImage}) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 w-full gap-6 max-w-4xl">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <h2 className="text-xl text-center font-semibold bg-gray-600 text-white py-2">Original Image</h2>
            {upLoadedImage ? (
                <img src={upLoadedImage} alt="" className="w-full h-full object-cover"/>
            ) :(
                <div className="flex items-center justify-center h-80 bg-gray-50">No Image Selected</div>
            )}
        </div>
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <h2 className="text-xl text-center font-semibold bg-blue-600 text-white py-2">Enhanced Image</h2>
            {(enhancedImage && !loading) && (
                <img src={enhancedImage} alt="" className="w-full h-full object-cover"/>
            )}

            {
                loading ? (
                    <Loading/>
                ): (
                <div className="flex items-center justify-center h-80 bg-gray-50">No Enhanced Image</div>
            )}
        </div>
    </div>
  );
};

export default ImagePreview;
