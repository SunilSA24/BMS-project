import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import '@ant-design/v5-patch-for-react-19';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route  path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
