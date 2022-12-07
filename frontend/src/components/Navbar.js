import logo from '../images/logo.png';
import { NavLink } from "react-router-dom";


function Navbar({ isLogged }) {
    return (
        <>
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <img src={logo} className="max-w-sm rounded-lg lg:ml-10" />
                </div>

                <div class="flex-none gap-2">
                    <ul class="menu menu-horizontal p-0">
                        <li><NavLink className="nav-link" to="/userDashboard">Home</NavLink></li>
                        <li><NavLink className="nav-link" to="/country">Country</NavLink></li>
                        <li><NavLink className="nav-link" to="/allNews">allNews</NavLink></li>
                        <li><NavLink className="nav-link" to="/about">About</NavLink></li>
                    </ul>
                    <div class="form-control">
                        <input type="text" placeholder="Search" class="input input-bordered" />
                    </div>
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a class="justify-between">
                                    Profile
                                    <span class="badge">New</span>
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