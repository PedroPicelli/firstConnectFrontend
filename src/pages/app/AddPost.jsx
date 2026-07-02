import "./AddPost.css"
import "./AppLayout.css"
import "../Inputs.css"
import { useNavigate } from "react-router-dom"
import AppHeader from "../../components/AppHeader"
import { useState } from "react"
import { createPostRequest } from "../../context/posts/createPostRequest"
import BaseError from "../../components/BaseError"

function AddPost() {

    const navigate = useNavigate()

    const [contentText, setContentText] = useState("")
    const [requestingPost, setRequestingPost] = useState(false)
    const [errorText, setErrorText] = useState("")


    async function handleCreatePost(e) {

        e.preventDefault()

        if(contentText.length == 0) {
            setErrorText("Invalid Content")
        }

        if(contentText.length > 1000) {
            setErrorText("Content Too Long")
        }

        if(contentText.length == 0 || contentText.length > 1000) {

            return

        }

        setRequestingPost(true)

        try {

            await createPostRequest(contentText)

            navigate("/profile")

        } catch(error) {

            switch(error.message) {

                case "Bad Request":
                    setErrorText("Invalid Content")
                    break;


                default:
                    setErrorText("Internal Server Error")
                    break;

            }

        } finally {

            setRequestingPost(false)

        }


    }


    return (

        <>
        
            <section className="app-page">
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader backFunction={ () => { if(!requestingPost) { navigate("/") } } } title="Create New Post" />


                        <main className="app-main">

                            <form onSubmit={ handleCreatePost } className="create-post-form">

                                <div className="form-default-input">
                                    <label htmlFor="content">Content:</label>
                                    <div className={ "input-wrapper" }>
                                        <textarea maxLength={ 1000 } id="content" className="input-textarea" placeholder="Write something cool..." value={ contentText } onInput={ (e) => { setContentText(e.target.value) } }></textarea>
                                    </div>

                                    <BaseError text={ errorText }/>
                                </div>

                                <button disabled={ requestingPost } className="default-button main-button">Create Post</button>

                            </form>

                        </main>
                    </div>
                </div>

            </section>
        
        </>

    )

}

export default AddPost
