import "./Auth.css"
import icon from "./../assets/icon.png"
import FloatingCard from "../components/FloatingCard"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { classifyLoginType, LoginIdentifierType } from "../utils/classify/classifyLoginIdentifier"

function Login() {

    const navigate = useNavigate()

    const [loginIdentifier, setLoginIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const loginIdentifierType = LoginIdentifierType.UNKNOWN


    function handleLoginIdentifier(e) {

        const identifierValue = e.target.value


        setLoginIdentifier(identifierValue)
        loginIdentifierType = classifyLoginType(identifierValue)

    }

    function handlePassword(e) {

        const passwordValue = e.target.value

        setPassword(password)
        
    }


    return (

        <>
        
            <section className="auth-page-section">

                <FloatingCard>
                    <div className="auth-header">

                        <img src={ icon } alt="Splash Image" onClick={ () => {
                            navigate("/splash")
                        }} />
                        <h1>Welcome again</h1>

                    </div>

                    <form action="" className="auth-forms">
                        <div className="form-default-input">
                            <label htmlFor="email">Email or username:</label>
                            <input type="text" id="email" value={ loginIdentifier } onInput={ handleLoginIdentifier }/>
                        </div>


                        <div className="form-default-input">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={ password } onInput={ handlePassword }/>
                        </div>


                        <button className="default-button main-button">Login</button>


                    </form>

                </FloatingCard>



            </section>
        
        </>

    )

}



export default Login
