import React from 'react'
import Feed from '../../components/feeds/Feed'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './Home.css'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home__container">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}

export default Home
