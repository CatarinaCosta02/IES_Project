import logo from '../images/logo.png';
import { NavLink } from "react-router-dom";


function Navbar({ isLogged }) {
    const categories = [
        "movies",
        "sports",
        "Health",
        "politics",
        "science",
        "business",
        "fashion",
        ]
    
    return (
        <>
            <div className="navbar bg-black">
                <div className="flex-1">
                    <img src={logo} className="max-w-sm rounded-lg lg:ml-10" />
                </div>

                <div className="flex-none gap-2">
                    <ul className="menu menu-horizontal p-0 ">
                        <li><NavLink className="nav-link shadow bg-black " to="/dashboard">Home</NavLink></li>
                        <li><NavLink className="nav-link shadow bg-black " to="/dashboard/allNews">All News</NavLink></li>
                        <div className="flex items-stretch">
                            <a className="btn btn-ghost rounded-btn">Button</a>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost rounded-btn">Search</label>
                                <ul tabIndex={1} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-80 mt-4">
                                    <input type="text" placeholder="Search..." className="input input-ghost w-full max-w-xs" />
                                    <div className="collapse">
                                        <input type="checkbox" className="peer" />
                                        <div className="collapse-title">
                                            <b>Advanced Filters</b>
                                        </div>
                                        <div className="collapse-content">
                                            <div className="flex justify-between items-center">
                                                <li className='pl-1 text-s'>Categories</li>
                                                <select className="select select-ghost select-sm">
                                                    {categories.map((category, index) => (
                                                        <option key={index}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>

                        <li><NavLink className="nav-link shadow bg-black " to="/dashboard/about">About</NavLink></li>
                    </ul>

                    
                    
                    {/* user profile */}
                    <div className="dropdown dropdown-end">
                        <label tabindex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabindex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-black rounded-box w-52">
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