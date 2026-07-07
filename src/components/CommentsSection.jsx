import "./CommentsSection.css"
import CommentCard from "./CommentCard"
import { CloseIcon } from "./icons/CloseIcon"
import { SendIcon } from "./icons/SendIcon"
import { useEffect, useState } from "react"
import { createCommentRequest } from "../context/posts/createCommentRequest"


function CommentsSection( { post, active, setActive, postsList=[], setPostsList } ) {

    const [commentsList, setCommentsList] = useState([])
    const [commentContentText, setCommentContentText] = useState("")
    const [requestingComment, setRequestingComment] = useState(false)


    useEffect(() => {

        if(post == null) {
            setActive(false)
        } else {

            setCommentsList(post.comments)
            setRequestingComment(false)

        }

    }, [active])


    async function handleSendComment(e) {

        e.preventDefault()

        if(post == null) {
            return
        }

        if(commentContentText == 0 || commentContentText > 500) {
            return
        }

        setRequestingComment(true)

        try {
            const data = await createCommentRequest(commentContentText, post.id)

            setCommentsList(prev => [data, ...prev]);
            setCommentContentText("")
            const newPosts = postsList.map(p => {
                if (p.id !== post.id) {
                    return p;
                }

                return {
                    ...p,
                    comments: [data, ...p.comments]
                };
            });

            setPostsList(prev =>
                prev.map(p =>
                    p.id === post.id
                        ? { ...p, comments: [data, ...p.comments] }
                        : p
                )
            );
            


        } catch(error) {

            switch(error.message) {

                case "Bad Request":
                    break;

                case "Not Found":
                    break;

                default:
                    break;

            }

        } finally {

            setRequestingComment(false)

        }

    }


    return (

        <>
        
            <div className="screen-filler" data-active={ active } onClick={ () => { setActive(false) } }>
                <div className="comments-section" onClick={ (e) => { e.stopPropagation() } }>

                    <header className="comments-header">
                        <div className="comments-header-spacer"/>
                        <h1>{ commentsList.length } comments</h1>
                        <button onClick={ () => { setActive(false) } }>
                            <CloseIcon width={ 28 } height={ 28 } />
                        </button>
                    </header>

                    <section className="comments-wrapper">
                        {

                            commentsList.map(comment => {

                                return <CommentCard key={ comment.id } comment={ comment }/>

                            })

                        }

                    </section>

                    <section className="comment-input-area">

                        <form onSubmit={ handleSendComment } className="comment-forms">

                            <textarea className="input-textarea comment-input" placeholder="Add Comment" value={ commentContentText } onInput={ (e) => { setCommentContentText(e.target.value) } } />

                            <button disabled={ requestingComment } className="send-comment-button">
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
