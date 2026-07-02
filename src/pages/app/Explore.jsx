
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"

function Explore() {

    return (

        <>
        
            <section className="app-page">
                
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader title="Explore" />

                        <main className="app-main">

                        </main>
                    </div>

                    <AppNav currentPage="explore" />
                </div>

            </section>
        
        </>

    )

}

export default Explore
