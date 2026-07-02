import "./AppLayout.css"
import "./Feed.css"
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"
import PostCard from "../../components/PostCard"
import { useEffect, useState } from "react"
import { getPostsRequest } from "../../context/posts/getPostsRequest"
import CommentsSection from "../../components/CommentsSection"
import { getUserJson } from "../../utils/storage/userStorage"
import WelcomeSidebar from "../../components/WelcomeSidebar"

function Feed() {

    const [postsList, setPostsList] = useState([])
    const [currentPost, setCurrentPost] = useState(null)

    const [commentsActive, setCommentsActive] = useState(false)

    useEffect(() => {

        async function getPosts(params) {
            const posts = await getPostsRequest()
            
            setPostsList(posts)
        }

        getPosts()

    }, [])

    useEffect(() => {
        
        if (!commentsActive) return;

        
        window.history.pushState({ popup: "comments" }, "");

        
        const handlePopState = (event) => {
            setCommentsActive(null);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);

            
            if (window.history.state?.popup === "comments") {
                window.history.back();
            }
        };
    }, [commentsActive, setCommentsActive]);





    return (

        <>
        
            <section className="app-page">
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader title="Feed" />


                        <main className="app-main feed-wrapper">

                            <div className="feed-posts">
                                {
                                    postsList.map((post) => (
                                        <PostCard key={ post.id } post={ post } setCommentsActive={ () => { setCommentsActive(true) } } changeCurrentPost={ setCurrentPost }/>
                                    ))
                                }
                            </div>

                            <div className="feed-sidebar">
                                <WelcomeSidebar displayName={ getUserJson().displayName }/>

                                <CommentsSection post={ currentPost } active={ commentsActive } setActive={ setCommentsActive } />
                            </div>
                        </main>
                    </div>


                    <AppNav currentPage="feed" />
                </div>

            </section>
        
        </>

    )

}

export default Feed
