import { Avatar } from '@material-ui/core'
import { PermMedia, Room, EmojiEmotions, Cancel } from '@material-ui/icons'
import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { storage } from '../../firebase/config'
import './Share.css'

const Share = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useContext(AuthContext)
    const desc = useRef()
    const [file, setFile] = useState(null)

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const uploadTask = storage.ref("connectify-user-posts/" + user._id + "/" + file.name).put(file);
        uploadTask.on("state_changed", (snapshot) => {
            console.log(snapshot);
        }, (err) => {
            console.log(err);
        }, () => {
            storage.ref("connectify-user-posts/" + user._id).child(file.name).getDownloadURL().then((imgUrl) => {
                const newPost = {
                    userId: user._id,
                    desc: desc.current.value,
                    img: imgUrl,
                }
                try {
                    axios.post("/posts", newPost);
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
            })
        })
        setFile(null);
    }

    return (
        <>
            <div className="share">
                <div className="share__wrapper">
                    <div className="share__top">
                        <Avatar className="share__img" src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} />
                        <input autoComplete="off" placeholder={"Describe your moments here, " + user.username} className="share__input" ref={desc} />
                    </div>
                    <hr className="share__hr" />
                    {file && (
                        <div className="share__image__container">
                            <img src={URL.createObjectURL(file)} alt="" />
                            <Cancel className="share__cancel__image" onClick={() => setFile(null)} />
                        </div>
                    )}
                    <form className="share__bottom" onSubmit={HandleSubmit}>
                        <div className="share__options">
                            <label htmlFor="post_picture_file" className="share__option">
                                <PermMedia htmlColor="tomato" className="share__icon" />
                                <span className="share__txt">Photos or videos</span>
                                <input type="file" name=""
                                    id="post_picture_file"
                                    accept=".png,.jpg,.jpeg"
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                            <div className="share__option">
                                <Room htmlColor="green" className="share__icon" />
                                <span className="share__txt">Location</span>
                            </div>
                            <div className="share__option">
                                <EmojiEmotions htmlColor="gold" className="share__icon" />
                                <span className="share__txt">Emojis</span>
                            </div>
                        </div>
                        <button className="share__button" type="submit">Share</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Share
