import './App.css'
import Home from './components/Home'

function App() {

  return (
    <>
      <div className='bg-gray-100 h-screen flex flex-col items-center justify-center'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold text-gray-800 mb-2'>AI Image Enhancer</h1>
          <p className='text-lg text-gray-500'>Upload your Image and let AI enhance in seconds</p>
        </div>
        <Home/>
        <div className='text-sm text-gray-500 mt-6'>
          Powered By @PhotoLab
        </div>
      </div>
    </>
  )
}

export default App
