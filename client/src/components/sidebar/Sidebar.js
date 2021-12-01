import { Chat, RssFeed, WorkOutline, Event, School, HelpOutline, Bookmark, Group, PlayCircleFilledOutlined } from '@material-ui/icons'
import React from 'react'
import './Sidebar.css'
import Friends from '../friends/Friends'
import { Users } from '../../dummyData'


const Sidebar = () => {

    return (
        <>
            <div className="sidebar">
                <div className="sidebar__container">
                    <ul className="sidebar__list">
                        <li className="sidebar_list_item">
                            <RssFeed className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Feeds
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <Chat className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Chats
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <PlayCircleFilledOutlined className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Videos
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <Group className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Groups
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <Bookmark className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Bookmarks
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <HelpOutline className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Questions
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <WorkOutline className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Jobs
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <Event className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Events
                            </span>
                        </li>
                        <li className="sidebar_list_item">
                            <School className="sidebar_list_icon" />
                            <span className="sidebar_list_txt">
                                Courses
                            </span>
                        </li>
                    </ul>
                    <button className="sidebar__btn">Show More</button>
                    <ul className="sidebar__friendList">
                        {Users.map(user => (
                            <Friends key={user.id} friend={user} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
