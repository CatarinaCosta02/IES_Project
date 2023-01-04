import styles from "../styles/search.module.scss"
import {useState} from "react";
import Gallery from "./gallery";


function SearchModal({ closeModal }) {
    const [advanced, setAdvanced] = useState(false);
    const [query, setQuery] = useState("");
    const [topic, setTopic] = useState(null);
    const [country, setCountry] = useState(null);

    const [results, setResults] = useState(null);

    const populateResults = () => {
        let url = process.env.REACT_APP_API_URL + "/api/search";
        let params = new URLSearchParams();
        params.append("title", query);
        if (topic && topic !== "all") {
            params.append("topic", topic);
        }
        if (country && country !== "all") {
            params.append("country", country);
        }

        fetch(url + "?" + params.toString(), {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setResults(data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className={styles.backdrop} onClick={closeModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <p className={styles.close} onClick={closeModal}>X</p>
                <h3>Search for articles</h3>
                <form onSubmit={e => {
                    e.preventDefault();
                    populateResults();
                }}>
                    <div className={styles.normal}>
                        <input className={styles.input} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search for articles" />
                        <input className={styles.submit} type="submit" value="Search" />
                        <button className={styles.advOpt} onClick={e => {
                            setAdvanced(!advanced);
                            e.preventDefault();
                        }}>More options</button>
                    </div>
                    <div className={[styles.advanced, advanced ? styles.open : ""].join(" ")}>
                        <div className={styles.input}>
                            <label htmlFor="country">Country</label>
                            <select name="country" onChange={e => setCountry(e.target.value)} id="country">
                                <option value="all">All</option>
                                <option value="us">United States</option>
                                <option value="gb">United Kingdom</option>
                                <option value="de">Germany</option>
                            </select>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="Topic">Topic</label>
                            <select name="topic" onChange={e => setTopic(e.target.value)} id="topic">
                                <option value="all">All</option>
                                <option value="tech">Technology</option>
                            </select>
                        </div>
                    </div>
                </form>
                
                <div className={styles.results}>
                    {results && <Gallery data={results} />}
                </div>
            </div>
        </div>
    );
}

export default SearchModal;