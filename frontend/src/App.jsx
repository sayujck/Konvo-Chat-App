import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import { Routes, Route  } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/signup" element={} />
        <Route path="/login" element={} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  )
}

export default App
