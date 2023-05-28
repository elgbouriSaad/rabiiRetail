import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Model from "./components/Model"
import Home from "./components/Home"
import Profile from "./components/Profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/model" element={<Model />} />
        <Route path="/profile/:clientId" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App