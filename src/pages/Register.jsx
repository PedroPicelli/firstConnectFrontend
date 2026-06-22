import "./Auth.css"
import { normalizeUsername } from "../utils/normalize/normalizeUsername";
import { hasInvalidUsernameChars } from "../utils/validation/usernameValidation";
import icon from "./../assets/icon.png"
import FloatingCard from "../components/FloatingCard"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useShakeAnimation } from "../hooks/input/useShakeAnimation";
import { emailAvailabilityRequest, usernameAvailabilityRequest } from "../context/availabilityRequests";
import { useDynamicValidation, useEmailAddressValidation } from "../hooks/input/useDinamicValidation";
import { normalizeEmail } from "../utils/normalize/normalizeEmail";
import { isValidEmail } from "../utils/validation/emailValidation";


const validatingClasses = {

    LOADING: "input-validating",
    AVAILABLE: "input-validated-available",
    NOT_AVAILABLE: "input-validated-not-available"

}



function Register() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [triggerEmailValidation, validateEmailClass, setValidateEmailClass] = useDynamicValidation(emailAvailabilityRequest)
    const triggerEmailAddressValidation = useEmailAddressValidation



    const [username, setUsername] = useState("")
    const { triggerShake, shakeClassName } = useShakeAnimation()

    const [triggerUsernameValidation, validateUsernameClass] = useDynamicValidation(usernameAvailabilityRequest)




    async function handleEmail(e) {
        const emailValue = e.target.value;

        const emailNormalized = normalizeEmail(emailValue)

        setEmail(emailNormalized)

        const availability = triggerEmailAddressValidation(emailNormalized)


        if(availability !== true) {
            setValidateEmailClass("")
            triggerEmailValidation("")
            return
        }


        triggerEmailValidation(emailNormalized)
        
    }

    
    function handleUsername(e) {

        const userValue = e.target.value;

        const userNormalized = normalizeUsername(userValue)

        setUsername(userNormalized);
        
        if(hasInvalidUsernameChars(userValue)) {
            triggerShake()
        }

        triggerUsernameValidation(userNormalized)
    }





    return (

        <>
        
            <section className="auth-page-section">

                <FloatingCard>
                    <div className="auth-header">

                        <img src={ icon } alt="Splash Image" onClick={ () => {
                            navigate("/splash")
                        }} />
                        <h1>Create account</h1>

                    </div>

                    <form action="" className="auth-forms">
                        <div className="form-default-input">
                            <label htmlFor="email">Email:</label>
                            <div className={ [
                                "input-wrapper",
                                validateEmailClass
                            ].join(" ") }>
                                <input type="text" autoComplete="email" inputMode="email" id="email" value={ email } onChange={ handleEmail }/>
                            </div>
                            <div className="spacer" />
                        </div>

                        <div className="form-default-input">
                            <label htmlFor="display-name">Display name:</label>
                            <div className="input-wrapper">
                                <input type="text" id="display-name" />
                            </div>
                            <p className="input-hint">This is how you will be seen. Be creative.</p>

                        </div>

                        

                        <div className="form-default-input">
                            <label htmlFor="username">Username:</label>
                            <div className={ [
                                "input-wrapper",
                                validateUsernameClass
                            ].join(" ") }>
                                <input className={ shakeClassName } type="text" value={ username } id="username" onInput={ handleUsername } />
                            </div>
                            <p className="input-hint">Only letters, numbers, _ and .</p>
                        </div>




                        <div className="form-default-input">
                            <label htmlFor="password">Password:</label>
                            <div className="input-wrapper">
                                <input type="password" id="password" />
                            </div>
                            <div className="spacer" />
                        </div>


                        <button className="default-button main-button">Create account</button>


                    </form>

                </FloatingCard>



            </section>
        
        </>

    )

}



export default Register
