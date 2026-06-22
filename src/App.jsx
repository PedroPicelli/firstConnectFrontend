import { Routes, Route } from "react-router-dom"
import Splash from "./pages/Splash"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"


function App() {

  return (

    <>
    
      <Routes>

        <Route path="/splash" element={ <Splash /> }/>

        <Route path="/login" element={ <Login /> }/>
        <Route path="/register" element={ <Register /> }/>

      </Routes>
    
    </>

  )

}


export default App
