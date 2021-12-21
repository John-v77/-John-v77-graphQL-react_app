import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import {UserContext} from '../../context/auth-context'

function NavBar(props) {

    const [user, setUser] = useContext(UserContext)

    console.log(user, 'nav')

    return (
        <header className='header'>
            <div className='nav-logo'>
                <h1>Travel Free</h1>
            </div>

            <nav className='navBar'>
                <ul>
                    <li> <Link to='/auth'>      Login   </Link> </li>
                    <li> <Link to='/events'>    Events   </Link> </li>
                    <li> <Link to='/booking'>   Booking   </Link> </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;