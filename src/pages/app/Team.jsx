
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"
import "./Text.css"

function Team() {

    return (

        <>
        
            <section className="app-page">
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader title="Team" />
                    
                        <main className="app-main"></main>
                    </div>

                    <AppNav currentPage="team" />
                </div>
            </section>
        
        </>

    )

}

export default Team
