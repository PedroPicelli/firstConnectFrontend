import "./CommentsSection.css"
import CommentCard from "./CommentCard"
import { CloseIcon } from "./icons/CloseIcon"
import { SendIcon } from "./icons/SendIcon"
import { act, useEffect } from "react"


function CommentsSection( { post, active, setActive } ) {

    useEffect(() => {

        if(post == null) {
            setActive(false)
        }

    }, [active])


    return (

        <>
        
            <div className="screen-filler" data-active={ active } onClick={ () => { setActive(false) } }>
                <div className="comments-section" onClick={ (e) => { e.stopPropagation() } }>

                    <header className="comments-header">
                        <div className="comments-header-spacer"/>
                        <h1>10 comments</h1>
                        <button onClick={ () => { setActive(false) } }>
                            <CloseIcon width={ 28 } height={ 28 } />
                        </button>
                    </header>

                    <section className="comments-wrapper">
                        <CommentCard comment={ {
                            author: "Pedro Picelli",
                            content: "Comentario 1"
                        } }/>

                        <CommentCard comment={ {
                            author: "Pedro Picelli",
                            content: "Testando modelo de comentario"
                        } }/>

                    </section>

                    <section className="comment-input-area">

                        <form onSubmit={ (e) => { e.preventDefault() } } className="comment-forms">

                            <textarea className="input-textarea comment-input" placeholder="Add Comment" />

                            <button className="send-comment-button">
                                <SendIcon />
                            </button>

                        </form>

                    </section>

                </div>
            </div>
        
        </>

    )

}


export default CommentsSection
