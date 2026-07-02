
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"


function Profile() {

    return (

        <>
        
            <section className="app-page">
                
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader title="Profile" />

                        <main className="app-main"></main>
                    </div>

                    <AppNav currentPage="profile" />
                </div>

            </section>
        
        </>

    )

}

export default Profile
