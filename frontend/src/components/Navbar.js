import background from "../images/background.jpg";
import App from "../App";

function Navbar() {
    return (
        <>
            <div className="navbar bg-transparent\100">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl" style={{color: "white"}}>What's New?</a>
                </div>

                <div className="navbar-end">
                    <button className="btn btn-outline btn-error">Login</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;