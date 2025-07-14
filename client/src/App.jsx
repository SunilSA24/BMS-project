import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import Partner from './pages/Partner';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import store from "./redux/store";
import ProtectedRoute from './components/ProtectedRoute';

import '@ant-design/v5-patch-for-react-19';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/partner' element={
            <ProtectedRoute>
              <Partner />
            </ProtectedRoute>
          } />
          <Route path='/admin' element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
    </BrowserRouter >
    </Provider >


  )
}

export default App
