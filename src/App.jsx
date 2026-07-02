import { Routes, Route } from "react-router-dom"
import Splash from "./pages/auth/Splash"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import "./App.css"
import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import Feed from "./pages/app/Feed"
import Explore from "./pages/app/Explore"
import Team from "./pages/app/Team"
import Profile from "./pages/app/Profle"
import AddPost from "./pages/app/AddPost"


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

        <Route path="/addPost" element={

          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>

        } />



      </Routes>
    
    </>

  )

}


export default App
