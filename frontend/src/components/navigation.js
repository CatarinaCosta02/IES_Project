import styles from "../styles/navigation.module.scss"
import {NavLink} from "react-router-dom";
import {useState} from "react";
import SearchModal from "./search";


function Navigation({ active }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className={styles.card}>
                <h3>Navigation</h3>
                <ul>
                    <li className={active === "Sign up" ? styles.active : ""}><NavLink to="/signup">Sign up</NavLink></li>
                    <li className={active === "Sign in" ? styles.active : ""}><NavLink to="/signin">Sign in</NavLink></li>
                    <li className={active === "Countries" ? styles.active : ""}><NavLink to="/countries">Countries</NavLink></li>
                    <li className={active === "Topics" ? styles.active : ""}><NavLink to="/topics">Topics</NavLink></li>
                </ul>

                <button onClick={() => setModalOpen(!modalOpen)} className={styles.search}>Search for articles</button>
            </div>
            {modalOpen && <SearchModal closeModal={() => {setModalOpen(false)} } />}
        </>
    );
}

export default Navigation;