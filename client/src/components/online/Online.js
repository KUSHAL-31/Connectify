import { Avatar } from '@material-ui/core'
import React from 'react'
import './Online.css'

const Online = ({ friend }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <li className="rightbar__friend">
            <div className="rightbar__profile">
                <Avatar className="profile__pic" src={PF + friend.profilePicture} />
                <span className="rightbar__online"></span>
            </div>
            <span className="rightbar__username">{friend.username}</span>
        </li>
    )
}

export default Online
