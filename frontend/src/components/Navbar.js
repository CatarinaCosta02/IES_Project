function Navbar({ isLogged }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
                <div className="navbar-start">
                    <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">What's New?</a>
                </div>

                {isLogged && (
                    <>
                        <div className="navbar-center">
                            <a href="#reddit" className="btn btn-ghost btn-sm rounded-btn">Reddit</a>
                            <a href="#hackernews" className="btn btn-ghost btn-sm rounded-btn">Hacker News</a>
                            <a href="#instagram" className="btn btn-ghost btn-sm rounded-btn">Instagram</a>
                        </div>

                        {/* Navbar buttons */}
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <div tabIndex="0" className="m-1 btn btn-square btn-ghost">
                                    <img src="https://i.pravatar.cc/300" alt="avatar" className="rounded-full w-8 h-8" />
                                </div>
                                <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a href="#" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">Settings</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </>
    )
}

export default Navbar;