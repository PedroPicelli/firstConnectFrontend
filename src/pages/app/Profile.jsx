import "./Profile.css"
import blankProfile from "../../assets/images/blankProfile.png";
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"
import "./Text.css"
import { getUserJson } from "../../utils/storage/userStorage";
import { useNavigate } from "react-router-dom";


function Profile() {

    const navigate = useNavigate()

    return (

        <>
        
            <section className="app-page">
                
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader title="Profile" />

                        <main className="app-main">

                            <div className="profile-header-infos">

                                <div className="profile-main-infos">
                                    <div className="profile-picture-wrapper">

                                        <img src={ blankProfile } alt="Profile Picture" />

                                    </div>

                                    <div className="profile-direct-infos-wrapper">
                                        
                                        <div className="profile-user">
                                            <h2 className="profile-displayName">{ getUserJson().displayName }</h2>
                                            <p className="profile-username">@{ getUserJson().username }</p>
                                        </div>
                                        <div className="profile-statistics">

                                            <div>
                                                <p>4</p>
                                                <p>posts</p>
                                            </div>
                                            <div>
                                                <p>283</p>
                                                <p>followers</p>
                                            </div>
                                            <div>
                                                <p>217</p>
                                                <p>following</p>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="profile-secondary-infos">

                                    <p>{ getUserJson().bio }</p>

                                </div>
                                
                                <div className="profile-utils">

                                    <button onClick={ () => { navigate("/editProfile") } } className="default-button secondary-button">Edit Profile</button>

                                </div>
                                


                            </div>


                        </main>
                    </div>

                    <AppNav currentPage="profile" />
                </div>

            </section>
        
        </>

    )

}

export default Profile
