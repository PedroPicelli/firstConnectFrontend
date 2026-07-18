import { useNavigate } from "react-router-dom"
import "./EditProfile.css"
import AppHeader from "../../components/AppHeader"
import blankProfile from "../../assets/images/blankProfile.png";
import BaseError from "../../components/BaseError";
import { useEffect, useState } from "react";
import { editProfileRequest } from "../../context/profile/editProfileRequest";
import { fullLoadStorage } from "../../utils/storage/loadStorage";
import { getUserJson } from "../../utils/storage/userStorage";

function EditProfile() {

    const navigate = useNavigate()

    const [displayName, setDisplayName] = useState(getUserJson().displayName)
    const [bio, setBio] = useState(getUserJson().bio)

    const [errorText, setErrorText] = useState("")

    const [requestingEdit, setRequestingEdit] = useState(false)

    function handleBackFunction() {

        if(!requestingEdit) {
            navigate("/profile")
        }

    }

    function handleError() {

        if(displayName.length < 3) {
            setErrorText("Display name too short")
        }

        if(displayName.length > 32) {
            setErrorText("Display name too long")
        }

        if(displayName.length < 3 || displayName.length > 32) {
            return false
        }



        if(bio.length > 150) {
            setErrorText("Bio too long")
            return false
        }

        return true

    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        if(!handleError()) {
            return
        }

        setErrorText("")

        setRequestingEdit(true)

        try {

            const data = await editProfileRequest(displayName, bio)

            fullLoadStorage(data.token, data.user)

            navigate("/profile")

        } catch(error) {

        } finally {
            setRequestingEdit(false)
        }

    }

    return (

        <>
        
            <section className="app-page">
                
                <div className="app-page-wrapper">
                    <div className="app-main-fields">
                        <AppHeader backFunction={ handleBackFunction } title="Edit Profile" />

                        <main className="app-main">

                            <form onSubmit={ handleSubmit } className="edit-profile-form">

                                <div className="edit-profile-picture-wrapper">
                                    <input type="image" src={ blankProfile } alt="Profile Picture" />
                                </div>

                                <div className="form-default-input">
                                    <label htmlFor="edit-profile-display-name">Display Name:</label>
                                    <div className="input-wrapper">
                                        <input placeholder="Max 32 characters" maxLength={ 32 } type="text" className="form-default-input" id="edit-profile-display-name" value={ displayName } onInput={ (e) => { setDisplayName(e.target.value) } }/>
                                    </div>
                                </div>

                                <div className="form-default-input">
                                    <label htmlFor="edit-profile-bio">Bio:</label>
                                    <div className="input-wrapper">
                                        <textarea placeholder="Max 150 characters" maxLength={ 150 } id="edit-profile-bio" className="input-textarea" value={ bio } onInput={ (e) => { setBio(e.target.value) } } ></textarea>
                                    </div>
                                </div>

                                <BaseError text={ errorText }/>

                                <button disabled={ requestingEdit } className="default-button main-button">Done</button>

                            </form>

                        </main>
                    </div>
                </div>
            </section>

        </>

    )

}

export default EditProfile
