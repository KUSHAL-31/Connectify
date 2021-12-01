
import React from 'react'
import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'


const Rightbar = ({ user }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const HomeRightBar = () => {
        return (
            <>
                <h3 className="rightbar__title">Online friends</h3>
                <ul className="rigthbar__friendlist">
                    {
                        Users.map(friend => (
                            <Online key={friend.id} friend={friend} />
                        ))
                    }
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                <h4 className="rightbar__title">User Information</h4>
                <div className="rightbar__info">
                    <div className="righbar__info__item">
                        <span className="rightbar__info__key">City : </span>
                        <span className="rightbar__info__value">{user.city}</span>
                    </div>
                    <div className="righbar__info__item">
                        <span className="rightbar__info__key">From : </span>
                        <span className="rightbar__info__value">{user.from}</span>
                    </div>
                </div>
                <h4 className="rightbar__title">
                    Your Friends
                </h4>
                <div className="rightbar__following__list">
                    <div className="rightbar__following">
                        <img src={`${PF}person/noAvatar.png`} alt="" className="rightbar__followingImg" />
                        <span className="rightbar__following__username">Kushal Soni</span>
                    </div>
                    <div className="rightbar__following">
                        <img src={`${PF}person/noAvatar.png`} alt="" className="rightbar__followingImg" />
                        <span className="rightbar__following__username">Kushal Soni</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="rightbar">
                <div className="rightbar__wrapper">
                    {user ? <ProfileRightBar /> : <HomeRightBar />}
                </div>
            </div>
        </>
    )
}

export default Rightbar
