import "./AppLayout.css"
import "./Feed.css"
import AppNav from "../../components/AppNav"
import AppHeader from "../../components/AppHeader"
import PostCard from "../../components/PostCard"
import { useEffect, useState } from "react"
import { getPostsRequest } from "../../context/posts/getPostsRequest"
import CommentsSection from "../../components/CommentsSection"

function Feed() {

    const [postsList, setPostsList] = useState([])
    const [currentPost, setCurrentPost] = useState(null)

    const [commentsActive, setCommentsActive] = useState(true)

    useEffect(() => {

        async function getPosts(params) {
            const posts = await getPostsRequest()
            
            setPostsList(posts)
        }

        getPosts()

    }, [])

    return (

        <>
        
            <section className="app-page">
                <AppHeader title="Feed" />


                <main className="app-main">

                    <div className="feed-posts">
                        {
                            postsList.map((post) => (
                                <PostCard key={ post.id } post={ post } changeCurrentPost={ () => { setCurrentPost(post) } }/>
                            ))
                        }
                    </div>

                    <CommentsSection post={ currentPost } active={ commentsActive } setActive={ setCommentsActive } />

                </main>


                <AppNav currentPage="feed" />

            </section>
        
        </>

    )

}

export default Feed
