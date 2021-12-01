import { Avatar, IconButton } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import './Post.css'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const Post = ({ post }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsliked] = useState(false)
    const [user, setUser] = useState({})

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsliked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    const handleLike = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsliked(!isLiked)
    }

    return (
        <>
            <div className="post">
                <div className="post__wrapper">
                    <div className="post__top">
                        <div className="post__topleft">
                            <Link to={`profile/${user.username}`}>
                                <Avatar className="post__profile__img" src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} />
                            </Link>
                            <span className="post__username">{user.username}</span>
                            <span className="post__date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                        <div className="post__topright">
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        </div>
                    </div>
                    <div className="post__center">
                        <span className="post__text">{post.desc ? post.desc : ""}</span>
                        <img src={post.img} alt="" className="post__img" />
                    </div>
                    <div className="post__bottom">
                        <div className="post__bottomleft">
                            <img src={PF + "heart.png"} alt="" />
                            <img src={PF + "like.png"} alt="" onClick={handleLike} />
                            <span className="like__counter">{like} people liked your post</span>
                        </div>
                        <div className="post__bottomright">
                            <span className="post__commentext">{post.comment} comments</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post
