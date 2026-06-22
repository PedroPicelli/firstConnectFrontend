import "./Auth.css"
import icon from "./../assets/icon.png"
import FloatingCard from "../components/FloatingCard"
import { useNavigate } from "react-router-dom"


function Login() {

    const navigate = useNavigate()

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
                            <input type="text" id="email" />
                        </div>


                        <div className="form-default-input">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" />
                        </div>


                        <button className="default-button main-button">Login</button>


                    </form>

                </FloatingCard>



            </section>
        
        </>

    )

}



export default Login
