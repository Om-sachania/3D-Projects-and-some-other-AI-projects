import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Model from "./components/Model"
import Navbar from "./components/Navbar"

function App() {

  // blue color : #2997FF
  // gray default : #86868b
  // gray-100 : #94928d
  // gray-200 : #afafaf
  // gray-300 : #42424570
  // zinc : #101010
  return (
    <>
      <main className="bg-black">
        <Navbar/>
        <Hero/>
        <Highlights/>
        <Model/>
      </main>
    </>
  )
}

export default App
