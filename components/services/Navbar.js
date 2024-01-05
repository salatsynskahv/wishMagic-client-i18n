import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Menu} from 'semantic-ui-react'
import {useAuth} from '../context/AuthContext'
import Login from "../home/Login";

function Navbar() {
    const {getUser, userIsAuthenticated, userLogout} = useAuth();

    const logout = () => {
        userLogout()
    }

    const enterMenuStyle = () => {
        return userIsAuthenticated() ? {"display": "none"} : {"display": "block"}
    }

    const logoutMenuStyle = () => {
        return userIsAuthenticated() ? {"display": "block"} : {"display": "none"}
    }

    const adminPageStyle = () => {
        const user = getUser()
        return user && user.data.rol[0] === 'ADMIN' ? {"display": "block"} : {"display": "none"}
    }

    const userPageStyle = () => {
        const user = getUser()
        return user && user.data.rol[0] === 'USER' ? {"display": "block"} : {"display": "none"}
    }

    const getUserName = () => {
        const user = getUser()
        return user ? user.data.name : ''
    }

    function getLoginOrLogout() {
        return userIsAuthenticated() ?
            (<Link to="/logout" className="hover:text-gray-300">Logout</Link>)
            : (<Link to="/login" className="hover:text-gray-300">Login</Link>);
    }

    return (
        <header className="bg-blue-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">Wishlist</div>

                <nav className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    {getLoginOrLogout()}
                    <a href="#" className="hover:text-gray-300">{`Hi ${getUserName()}`}</a>
                    <a href="#" className="hover:text-gray-300">Contact</a>
                </nav>
            </div>
        </header>
        // <Menu inverted color='purple' stackable size='massive' style={{borderRadius: 0}}>
        //   <Container>
        //     <Menu.Item header>Movie-UI</Menu.Item>
        //     <Menu.Item as={Link} exact='true' to="/">Home</Menu.Item>
        //     <Menu.Item as={Link} to="/adminpage" style={adminPageStyle()}>AdminPage</Menu.Item>
        //     <Menu.Item as={Link} to="/userpage" style={userPageStyle()}>UserPage</Menu.Item>
        //     <Menu.Menu position='right'>
        //       <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
        //       <Menu.Item as={Link} to="/signup" style={enterMenuStyle()}>Sign Up</Menu.Item>
        //       <Menu.Item header style={logoutMenuStyle()}>{`Hi ${getUserName()}`}</Menu.Item>
        //       <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Menu.Item>
        //     </Menu.Menu>
        //   </Container>
        // </Menu>
    )
}

export default Navbar
