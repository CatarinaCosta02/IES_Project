import styles from "../styles/search.module.scss"
import {useState} from "react";


function SearchModal({ closeModal }) {
    const [advanced, setAdvanced] = useState(false);

    return (
        <div className={styles.backdrop} onClick={closeModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <p className={styles.close} onClick={closeModal}>X</p>
                <h3>Search for articles</h3>
                <form>
                    <div className={styles.normal}>
                        <input className={styles.input} type="text" placeholder="Search for articles" />
                        <input className={styles.submit} type="submit" value="Search" />
                        <button className={styles.advOpt} onClick={e => {
                            setAdvanced(!advanced);
                            e.preventDefault();
                        }}>More options</button>
                    </div>
                    <div className={[styles.advanced, advanced ? styles.open : ""].join(" ")}>
                        <div className={styles.input}>
                            <label htmlFor="country">Country</label>
                            <select name="country" id="country">
                                <option value="all">All</option>
                                <option value="us">United States</option>
                                <option value="gb">United Kingdom</option>
                                <option value="de">Germany</option>
                            </select>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="Topic">Topic</label>
                            <select name="topic" id="topic">
                                <option value="all">All</option>
                                <option value="tech">Technology</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SearchModal;