import "./PostCard.css"
import { LikeIcon } from "./icons/LikeIcon"
import { ChatIcon } from "./icons/ChatIcon"
import { toggleLikeRequest } from "../context/posts/toggleLikeRequest"
import { useState } from "react"
import { getRelativeTime } from "../utils/time/relativeTime"

function PostCard({ post, changeCurrentPost, setCommentsActive }) {

    const [isLiked, setIsLiked] = useState(post.isLikedByMe)
    const [likesCount, setLikesCount] = useState(post.likesCount)

    const [requestingLike, setRequestingLike] = useState(false)



    async function handleLike(e) {


        setRequestingLike(true)

        try {

            const data = await toggleLikeRequest(post.id)

            setIsLiked(data.isLiked)
            setLikesCount(data.totalLikes)

        } catch(error) {

            switch(error.message) {

                case "Not Found":
                    setIsLiked(!isLiked)
                    setLikesCount(0)

                    break;

                default:
                    break;

            }

        } finally {

            setRequestingLike(false)

        }

    }


    return (

        <>
        
            <article className="post-card">

                <header className="post-header">
                    <div className="post-user">
                        <h2 className="post-author text-overflow-styled">{ post.displayName }</h2>
                        <p className="post-username text-overflow-styled">@{ post.username }</p>
                    </div>
                    <div className="post-time-wrapper">
                        <p className="post-time text-overflow-styled">• { getRelativeTime(post.createdAt) }</p>
                    </div>

                </header>


                <section className="post-content">

                    <p className="post-content-text">{ post.content }</p>

                </section>


                <footer className="post-footer">

                    <button disabled={ requestingLike } onClick={ handleLike } data-liked={ isLiked }>
                        <LikeIcon />
                        <p>
                            {
                                likesCount == 0
                                    ? "Like"
                                    : likesCount
                            }   
                        </p>
                    </button>
                    
                    <button onClick={ () => {
                            changeCurrentPost(post); setCommentsActive(true)
                        } }>
                        <ChatIcon />
                        <p>{
                                post.comments.length == 0
                                    ? "Comment"
                                    : post.comments.length
                            
                            }</p>
                    </button>

                </footer>

            </article>
        
        </>

    )

}

export default PostCard
