import './Navbar.css'
import { Person, Search, Chat, Notifications } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const { user } = useContext(AuthContext)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const history = useHistory();

    const handleLogoClick = () => {
        history.push("/")
    }

    return (
        <>
            <nav className="navbar__container">
                <div className="navbar__left">
                    <h1 id="logo" onClick={handleLogoClick}>Conne<span id="span_logo">ctify</span></h1>
                </div>
                <div className="navbar__center">
                    <div className="searchbar">
                        <Search className="search__icon" />
                        <input placeholder="Add a friend ( enter your friend's username )" autoComplete="off" className="search__input" />
                    </div>
                </div>
                <div className="navbar__right">
                    <div className="navbar__icons">
                        <div className="navbar__icon__item">
                            <Person />
                            <span className="icon__badge">1</span>
                        </div>
                        <div className="navbar__icon__item">
                            <Chat />
                            <span className="icon__badge">2</span>
                        </div>
                        <div className="navbar__icon__item">
                            <Notifications />
                            <span className="icon__badge">3</span>
                        </div>
                    </div>
                    <div className="profile__div">
                        <Link to={`profile/${user.username}`}>
                            <Avatar className="profile__pic" src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
