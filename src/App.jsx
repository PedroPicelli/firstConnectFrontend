import { Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"


function App() {

  return (

    <>
    
      <Routes>

        <Route path="/splash" element={ <Splash /> }/>

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path="/home" element={

          <ProtectedRoute>
            <Home />
          </ProtectedRoute>

        } />



      </Routes>
    
    </>

  )

}


export default App
