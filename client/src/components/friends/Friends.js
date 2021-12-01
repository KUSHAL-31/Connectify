import './Friends.css'

const Friends = ({ friend }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <li className="sidebar__friend">
            <img src={PF + friend.profilePicture} alt="friend profile pic" />
            <span className="sidebar__friendName">{friend.username}</span>
        </li>
    )
}

export default Friends
