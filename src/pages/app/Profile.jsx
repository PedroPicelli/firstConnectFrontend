import "./Profile.css"
import blankProfile from "../../assets/images/blankProfile.png";
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"
import "./Text.css"
import { changeUser, getUserJson } from "../../utils/storage/userStorage";
import { useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard"
import { useEffect, useState } from "react";
import WelcomeSidebar from "../../components/WelcomeSidebar";
import CommentsSection from "../../components/CommentsSection";
import { getUserResquest } from "../../context/profile/getUserRequest";


function Profile() {

    const navigate = useNavigate()

    const [postsList, setPostsList] = useState([])
    const [currentPost, setCurrentPost] = useState(null)
    const [commentsActive, setCommentsActive] = useState(false)


    useEffect(() => {
        async function fetchData() {
            var user = await getUserResquest()

            setPostsList(user.posts)
            changeUser(user)

        }
        fetchData()
    }, [])

    return (

        <>
        
            <section className="app-page">
                
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader title="Profile" />

                        <main className="app-main">
                            <div className="profile-wrapper">
                                <div className="profile-main">
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
                                                        <p>{ postsList.length }</p>
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
                                    <div className="profile-user-posts">

                                        <div className="feed-posts">
                                            {
                                                postsList.map(post => (
                                                    <PostCard key={ post.id } post={ post } setCommentsActive={ () => { setCommentsActive(true) } } changeCurrentPost={ setCurrentPost }/>
                                                                                        
                                                ))
                                            }
                                        </div>


                                    </div>
                                </div>
                                <div className="profile-sidebar">
                                    <WelcomeSidebar displayName={ getUserJson().displayName }/>

                                    <CommentsSection post={ currentPost } active={ commentsActive } setActive={ setCommentsActive } postsList={ postsList } setPostsList={ setPostsList } />
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
