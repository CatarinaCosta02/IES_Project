import logo from '../images/logo.png';
import { NavLink } from "react-router-dom";


function Navbar({ isLogged }) {

    
    return (
        <>
            <div className="navbar bg-black">
                <div className="flex-1">
                    <img src={logo} className="max-w-sm rounded-lg lg:ml-10" />
                </div>

                <div className="flex-none gap-2">
                    <ul className="menu menu-horizontal p-0">
                        <li><NavLink className="nav-link" to="/dashboard">Home</NavLink></li>
                        <li><NavLink className="nav-link" to="/dashboard/country">All News</NavLink></li>
                        <li><NavLink className="nav-link" to="/dashboard/allNews">Country</NavLink></li>
                        <li><NavLink className="nav-link" to="/dashboard/about">About</NavLink></li>
                    </ul>
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabindex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabindex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;