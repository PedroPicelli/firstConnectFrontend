import "./CommentCard.css"

function CommentCard( { comment } ) {

    return (

        <>
        
            <article className="comment-card">

                <header className="comment-header">

                    <h2 className="comment-author">{ comment.author }</h2>

                </header>

                <main className="comment-content">

                    <p className="comment-content-text">{ comment.content }</p>

                </main>

            </article>
        
        </>

    )

}

export default CommentCard

