import { Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import Feed from "./pages/Feed"
import Explore from "./pages/Explore"
import Team from "./pages/Team"
import Profile from "./pages/Profle"


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




        <Route path="/" element={

          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>

        } />

        <Route path="/explore" element={

          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>

        } />

        <Route path="/team" element={

          <ProtectedRoute>
            <Team />
          </ProtectedRoute>

        } />

        <Route path="/profile" element={

          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>

        } />



      </Routes>
    
    </>

  )

}


export default App
