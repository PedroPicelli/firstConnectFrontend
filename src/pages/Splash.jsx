import icon from "./../assets/icon.png"
import { useNavigate } from "react-router-dom"
import "./Splash.css"


function Splash() {

    const navigate = useNavigate()

    return (

        <>
        
            <section className="splash-page-section">

                <div className="splash-page-icon-showcase">
                    <img src={ icon } alt="Splash Image" />
                    

                </div>
                <div className="splash-page-slogan">
                    <p>Connect talents.</p>
                    <p>Build the future of FIRST.</p>
                </div>
                <div className="splash-page-choice-box">

                    <div className="splash-page-buttons">

                        <button className="default-button main-button" onClick={ () => {
                            navigate("/login")
                        }}>Login</button>

                        <button className="default-button secondary-button" onClick={ () => {
                            navigate("/register")
                        }}>Create account</button>

                    </div>

                    <p>Join thousands of amazing students and teams.</p>

                </div>

            </section>
        
        </>

    )

}


export default Splash
