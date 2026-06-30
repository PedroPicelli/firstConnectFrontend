import "./AppNav.css"
import { AddIcon } from "../components/icons/AddIcon"
import { UserIcon } from "../components/icons/UserIcon"
import { FeedIcon } from "../components/icons/FeedIcon"
import { ExploreIcon } from "../components/icons/ExploreIcon"
import { TeamIcon } from "../components/icons/TeamIcon"
import { useNavigate } from "react-router-dom"

function AppNav( { currentPage } ) {

    const navigate = useNavigate()

    return (

        <>
        
            <nav className="app-nav">

                <button className={ [
                        "default-nav-button",
                        currentPage == "feed" && "nav-current-page"
                    ].filter(Boolean).join(" ") } onClick={ () => { navigate("/") } }>
                    <FeedIcon width={ 32 } height={ 32 } />
                    <p>Feed</p>
                </button>

                <button className={ [
                        "default-nav-button",
                        currentPage == "explore" && "nav-current-page"
                    ].filter(Boolean).join(" ") } onClick={ () => { navigate("/explore") } }>
                    <ExploreIcon width={ 32 } height={ 32 } />
                    <p>Explore</p>
                </button>
                
                <button className="main-button emphasis-nav-button" onClick={ () => { navigate("/addPost") } }>
                    <AddIcon width={ 40 } height={ 40 } />
                </button>
                
                <button className={ [
                        "default-nav-button",
                        currentPage == "team" && "nav-current-page"
                    ].filter(Boolean).join(" ") } onClick={ () => { navigate("/team") } }>
                    <TeamIcon width={ 32 } height={ 32 } />
                    <p>Team</p>
                </button>
                
                <button className={ [
                        "default-nav-button",
                        currentPage == "profile" && "nav-current-page"
                    ].filter(Boolean).join(" ") } onClick={ () => { navigate("/profile") } }>
                    <UserIcon width={ 32 } height={ 32 } />
                    <p>Profile</p>
                </button>

            </nav>
        
        </>

    )

}

export default AppNav

