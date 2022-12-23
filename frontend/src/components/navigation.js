import styles from "../styles/navigation.module.scss"
import {NavLink} from "react-router-dom";


function Navigation() {
    return (
        <div className={styles.card}>
            <h3>Navigation</h3>
            <ul>
                <li><NavLink to="/signup">Sign up</NavLink></li>
                <li><NavLink to="/signin">Sign in</NavLink></li>
                <li><NavLink to="/countries">Countries</NavLink></li>
                <li><NavLink to="/topics">Topics</NavLink></li>
            </ul>
        </div>
    );
}

export default Navigation;