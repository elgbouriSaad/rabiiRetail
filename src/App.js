import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Model from "./components/Model"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/model" element={<Model />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App