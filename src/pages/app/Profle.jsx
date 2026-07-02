
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"


function Profile() {

    return (

        <>
        
            <section className="app-page">
                <AppHeader title="Profile" />

                <main className="app-main"></main>

                <AppNav currentPage="profile" />

            </section>
        
        </>

    )

}

export default Profile
