import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Feed from '../../components/feeds/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './Profile.css'
import { Add, Edit } from '@material-ui/icons'
import { storage } from '../../firebase/config'
import spinner from '../../assets/spinner.gif'
import axios from 'axios'
import { useParams } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'


const Profile = () => {

    const { user: currentUser } = useContext(AuthContext);

    const username = useParams().username
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const [profileUrl, setProfileUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username])


    const HandleCover = (e) => {

        let cover = document.getElementById("coverpictureofuser");
        document.getElementById("coverpictureofuser").src = spinner
        e.preventDefault();

        const selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            const checkfile = storage.ref("connectify-cover-pictures/" + currentUser._id).child(currentUser.profilePicture);
            const uploadTask = storage.ref("connectify-cover-pictures/" + currentUser._id + "/" + selected.name).put(selected)
            uploadTask.on("state_changed",
                (snapshot) => {
                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    storage.ref("connectify-cover-pictures/" + currentUser._id).child(selected.name).getDownloadURL().then((imgUrl) => {
                        setCoverUrl(imgUrl)
                        cover.classList.remove("cover_loading");
                        console.log(imgUrl);
                    })
                })
            setProgress(0);
        }
        else {
            alert("Please select a valid image file");
        }
    }

    const HandleProfilePic = (e) => {
        document.getElementById("profilepictureofuser").src = spinner
        e.preventDefault();

        const selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {

            const checkfile = storage.ref("connectify-profile-pictures/" + currentUser._id)
            if (checkfile) {
                checkfile.child().delete().then(() => {
                    console.log("Profile pic updated");
                }).catch(err => {
                    console.log(err);
                })
            }

            const uploadTask = storage.ref("connectify-profile-pictures/" + currentUser._id + "/" + selected.name).put(selected)
            uploadTask.on("state_changed",
                (snapshot) => {
                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    storage.ref("connectify-profile-pictures/" + currentUser._id).child(selected.name).getDownloadURL().then((imgUrl) => {
                        setProfileUrl(imgUrl)
                        const updateUser = {
                            userId: currentUser._id,
                            profilePicture: imgUrl,
                        }
                        axios.put(`/users/${currentUser._id}`, updateUser)
                    })
                })
        }
        else {
            alert("Please select a valid image file");
        }
    }

    return (
        <>
            <Navbar />
            <div className="profile__container">
                <Sidebar />
                <div className="profile__right">
                    <div className="profile__rightTop">
                        <div className="profile__cover">
                            <input type="file" name="profile__cover__upload" id="profile__cover__upload" onChange={HandleCover} />
                            <label htmlFor="profile__cover__upload"><div className="profile_cover_upload_icon"><Edit id="cover__edit__icon" /></div></label>
                            <img src={coverUrl ? `${coverUrl}` : `${PF}person/noCover.png`} alt="" className="profile__coverImg" id="coverpictureofuser" />
                            <div className="profile__userImg">
                                <img src={currentUser.profilePicture ? currentUser.profilePicture : (profileUrl ? `${profileUrl}` : `${PF}person/noAvatar.png`)} alt="" id="profilepictureofuser" />
                                <input type="file" name="profile__pic__upload" id="profile__pic__upload" onChange={HandleProfilePic} />
                                <label htmlFor="profile__pic__upload"><div className="profile_pic_upload_icon"><Add id="upload__pic__icon" /></div></label>
                            </div>
                        </div>
                        <div className="profile__info">
                            <h4 className="profile__name">{user.username}</h4>
                            <span className="profile__desc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profile__rightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
