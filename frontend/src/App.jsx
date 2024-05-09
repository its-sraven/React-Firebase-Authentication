import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Homepage from './pages/Homepage';
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App
