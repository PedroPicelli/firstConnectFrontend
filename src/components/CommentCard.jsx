import { getRelativeTime } from "../utils/time/relativeTime"
import "./CommentCard.css"

function CommentCard( { comment } ) {

    return (

        <>
        
            <article className="comment-card">

                <header className="comment-header">

                    <h2 className="comment-author text-overflow-styled">{ comment.displayName }</h2>
                    <p className="comment-time text-overflow-styled">• { getRelativeTime(comment.createdAt) }</p>

                </header>

                <main className="comment-content">

                    <p className="comment-content-text">{ comment.content }</p>

                </main>

            </article>
        
        </>

    )

}

export default CommentCard

