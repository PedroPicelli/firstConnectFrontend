import "./Auth.css"
import icon from "./../assets/icon.png"
import FloatingCard from "../components/FloatingCard"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { classifyLoginType, LoginIdentifierType } from "../utils/classify/classifyLoginIdentifier"
import BaseError from "../components/BaseError"
import { loginRequest } from "../context/authRequests"


function Login() {

    const navigate = useNavigate()

    const [requestingLogin, setRequestingLogin] = useState(false)

    const [loginIdentifier, setLoginIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [loginIdentifierType, setLoginIdentifierType] = useState(LoginIdentifierType.UNKNOWN)

    const [errorText, setErrorText] = useState("")



    function handleLoginIdentifier(e) {

        const identifierValue = e.target.value


        setLoginIdentifier(identifierValue)
        setLoginIdentifierType(classifyLoginType(identifierValue))

    }

    function handlePassword(e) {

        const passwordValue = e.target.value

        setPassword(passwordValue)
        
    }

    async function handleLogin(e) {

        e.preventDefault()

        if(loginIdentifierType == LoginIdentifierType.UNKNOWN) {
            setErrorText("Invalid Credentials")
        }

        setRequestingLogin(true)
        
        try {
            const data = await loginRequest(loginIdentifier, loginIdentifierType, password)

            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            setErrorText("")

            navigate("/home")

        } catch(error) {

            switch(error.message) {

                case "Unauthorized":
                case "Bad Request":
                    setErrorText("Invalid Credentials")
                    break;

                default:
                    setErrorText("Internal Server Error")
                    break;

            }

        } finally {
            setRequestingLogin(false)

        }

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

                    <form onSubmit={ handleLogin } className="auth-forms">
                        <div className="form-default-input">
                            <label htmlFor="email">Email or username:</label>
                            <input type="text" id="email" value={ loginIdentifier } onInput={ handleLoginIdentifier }/>
                        </div>


                        <div className="form-default-input">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={ password } onInput={ handlePassword }/>
                        </div>


                        <BaseError text={ errorText } />


                        <button disabled={ requestingLogin } className="default-button main-button">Login</button>


                    </form>

                </FloatingCard>



            </section>
        
        </>

    )

}



export default Login
