import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'

const Feed = ({ username }) => {

    const { user } = useContext(AuthContext);

    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username ? await axios.get("/posts/profile/" + username) :
                await axios.get("posts/timeline/" + user._id);
            setPosts(res.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            }));
        }
        fetchPosts();
    }, [username, user._id])

    return (
        <>
            <div className="feeds">
                <div className="feed__wrapper">
                    <Share />
                    {posts.map((item) => (
                        <Post key={item._id} post={item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Feed
