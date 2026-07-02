import "./Auth.css"
import "../Inputs.css"
import { normalizeUsername } from "../../utils/normalize/normalizeUsername";
import { hasInvalidUsernameChars } from "../../utils/validation/usernameValidation";
import icon from "../../assets/icon.png"
import FloatingCard from "../../components/FloatingCard"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useShakeAnimation } from "../../hooks/input/useShakeAnimation";
import { emailAvailabilityRequest, usernameAvailabilityRequest } from "../../context/availabilityRequests";
import { useDynamicValidation, useEmailAddressValidation } from "../../hooks/input/useDynamicValidation";
import { normalizeEmail } from "../../utils/normalize/normalizeEmail";
import { isValidEmail } from "../../utils/validation/emailValidation";
import { registerRequest } from "../../context/authRequests";
import { validateInput } from "../../utils/validation/generalValidation";


const validatingClasses = {

    LOADING: "input-validating",
    AVAILABLE: "input-validated-available",
    NOT_AVAILABLE: "input-validated-not-available"

}



function Register() {

    const navigate = useNavigate()

    const [requestingRegister, setRequestingRegister] = useState(false)

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const { triggerShake: emailTriggerShake, shakeClassName: emailShakeClassName } = useShakeAnimation()

    const [triggerEmailValidation, validateEmailClass, setValidateEmailClass, emailAvailability] = useDynamicValidation(emailAvailabilityRequest)
    const triggerEmailAddressValidation = useEmailAddressValidation


    const [displayName, setDisplayName] = useState("")
    const [validateDisplayNameClass, setValidateDisplayNameClass] = useState("")
    const [validDisplayName, setValidDisplayName] = useState(false)

    const { triggerShake: displayNameTriggerShake, shakeClassName: displayNameShakeClassName } = useShakeAnimation()

    

    const [username, setUsername] = useState("")
    const { triggerShake: usernameTriggerShake, shakeClassName: usernameShakeClassName } = useShakeAnimation()
    const [validUsername, setValidUsername] = useState(false)

    const [triggerUsernameValidation, validateUsernameClass, , usernameAvailability] = useDynamicValidation(usernameAvailabilityRequest)


    const [password, setPassword] = useState("")
    const [validatePasswordClass, setValidatePasswordClass] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    
    const { triggerShake: passwordTriggerShake, shakeClassName: passwordShakeClassName } = useShakeAnimation()

    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [displayNameError, setDisplayNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    

    function verifyEmail(emailNormalized) {

        const availability = triggerEmailAddressValidation(emailNormalized)


        if(availability !== true) {
            setValidateEmailClass("")
            triggerEmailValidation("")
            setValidEmail(false)
            return false
        }

        setValidEmail(true)


        triggerEmailValidation(emailNormalized)
        return true
    }

    async function handleEmail(e) {
        const emailValue = e.target.value;

        const emailNormalized = normalizeEmail(emailValue)

        setEmail(emailNormalized)
        setEmailError("")

        verifyEmail(emailNormalized)        
    }

    
    function verifyUsername(userValue) {
        if(hasInvalidUsernameChars(userValue)) {
            usernameTriggerShake()
        }

        if(userValue.length >= 3) {
            setValidUsername(true)
        } else {
            setValidUsername(false)
        }

        triggerUsernameValidation(userValue)
    }

    function handleUsername(e) {

        const userValue = e.target.value;

        const userNormalized = normalizeUsername(userValue)

        setUsername(userNormalized);
        setUsernameError("")
        
        verifyUsername(userValue)
    }


    function handleDisplayName(e) {
        
        const displayNameValue = e.target.value;
        
        setDisplayName(displayNameValue)
        setDisplayNameError("")

        if(displayNameValue.length == 0) {
            setValidateDisplayNameClass("")
            return
        }
        
        if(displayNameValue.length >= 3) {
            setValidDisplayName(true)
        } else {
            setValidDisplayName(false)
        }

        setValidateDisplayNameClass(validateInput(displayNameValue.length >= 3))
    }

    
    function handlePassword(e) {
        const passwordValue = e.target.value

        setPassword(passwordValue)
        setPasswordError("")
    
        if(passwordValue.length == 0) {
            setValidatePasswordClass("")
            return
        }

        if(passwordValue.length >= 8) {
            setValidPassword(true)
        } else {
            setValidPassword(false)
        }

        setValidatePasswordClass(validateInput(passwordValue.length >= 8))

    }

    function handleError(emailAvailable, usernameAvailable) {
        setEmailError("")
        setDisplayNameError("")
        setUsernameError("")
        setPasswordError("")


        if(!validEmail) {
            setEmailError("Please insert a valid email")
            
        } else if(!emailAvailability) {
            setEmailError("This email is already taken")
        }

        if(!validEmail || !emailAvailability) {
            emailTriggerShake()
            return false
        }

        if(!validDisplayName) {
            displayNameTriggerShake()
            setDisplayNameError("Display Name must have at least 3 characters")
            return false
        }


        if(!validUsername) {
            setUsernameError("Username must have at least 5 characters")

        } else if(!usernameAvailability) {
            setUsernameError("This username is already taken")
        }

        if(!validUsername || !usernameAvailability) {
            usernameTriggerShake()
            return false
        }

        if(!validPassword) {
            passwordTriggerShake()
            setPasswordError("Password must have at least 8 characters")
            return false
        }

        return true
    }


    async function handleRegister(e) {

        e.preventDefault();

        if(!handleError()) {
            return
        }

        setRequestingRegister(true)

        try {
            await registerRequest(email, displayName, username, password)

            navigate("/login")


        } catch(error) {
            switch(error.message) {
                case "Conflict":
                    verifyEmail(email)
                    verifyUsername(username)
                    break;

                default:
                    alert("Internal Server Error")
                    break;
            }
        } finally {

            setRequestingRegister(false)

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
                        <h1>Create account</h1>

                    </div>

                    <form onSubmit={ handleRegister } className="auth-forms">
                        <div className="form-default-input">
                            <label htmlFor="email">Email:</label>
                            <div className={ [
                                "input-wrapper",
                                validateEmailClass,
                                emailError.length > 0 && "input-wrapper-error"
                            ].join(" ") }>
                                <input className={ emailShakeClassName } type="text" autoComplete="email" inputMode="email" id="email" value={ email } onChange={ handleEmail }/>
                            </div>
                            <p className="input-hint">{ emailError }</p>
                        </div>

                        <div className="form-default-input">
                            <label htmlFor="display-name">Display name:</label>
                            <div className={ [
                                "input-wrapper",
                                validateDisplayNameClass,
                                displayNameError.length > 0 && "input-wrapper-error"
                                ].join(" ") }>
                                <input className={ displayNameShakeClassName } type="text" id="display-name" value={ displayName } onInput={ handleDisplayName }/>
                            </div>
                            <p className="input-hint">{
                                displayNameError.length == 0
                                    ? "This is how you will be seen. At least 3 characters."
                                    : displayNameError
                            }</p>

                        </div>

                        
                        <div className="form-default-input">
                            <label htmlFor="username">Username:</label>
                            <div className={ [
                                "input-wrapper",
                                validateUsernameClass,
                                usernameError.length > 0 && "input-wrapper-error"
                            ].join(" ") }>
                                <input className={ usernameShakeClassName } type="text" value={ username } id="username" onInput={ handleUsername } />
                            </div>
                            <p className="input-hint">{
                                usernameError.length == 0
                                    ? "Only letters, numbers, _ and ."
                                    : usernameError
                            
                            }</p>
                        </div>


                        <div className="form-default-input">
                            <label htmlFor="password">Password:</label>
                            <div className={ [
                                "input-wrapper",
                                validatePasswordClass,
                                passwordError.length > 0 && "input-wrapper-error"
                                ].join(" ") }>
                                <input className={ passwordShakeClassName } type="password" id="password" value={ password } onInput={ handlePassword } />
                            </div>
                            <p className="input-hint">{
                                passwordError.length == 0
                                    ? "At least 8 characters"
                                    : passwordError
                            }</p>
                        </div>


                        <button disabled={ requestingRegister } className="default-button main-button">Create account</button>


                    </form>

                </FloatingCard>



            </section>
        
        </>

    )

}



export default Register
