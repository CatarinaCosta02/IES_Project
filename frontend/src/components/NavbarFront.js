import logo from '../images/logo.png';
import { NavLink } from "react-router-dom";


function NavbarFront({ isLogged }) {

    
    return (
        <>
            <div className="navbar bg-black">
                <div className="flex-1">
                    <img src={logo} className="max-w-sm rounded-lg lg:ml-10" />
                </div>

                <div className="flex-none gap-2">
                    <ul className="menu menu-horizontal p-0">
                        <li><NavLink className="nav-link" to="/about">About</NavLink></li>
                    </ul>
                    <ul className="menu menu-horizontal p-0">
                        <a href="/login" className="btn rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500 h-7 w-22">Sign in</a>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavbarFront;