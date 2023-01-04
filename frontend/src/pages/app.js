import styles from "../styles/main.module.scss"
import HottestNews from "../components/hottest";
import Navigation from "../components/navigation";
import Gallery from "../components/gallery";
import {useEffect, useState} from "react";


function App() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/api/news";
        fetch(url, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setNews(data.splice(0, 5));
            })
            .catch(error => {
                console.error(error);
            });
    });

    return (
        <>
            <div className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.lead}>
                        Welcome to <b>What's New</b>
                    </h1>
                    <h2 className={styles.pitch}>
                        Always one step ahead
                    </h2>
                </div>
            </div>

            <main className={styles.main}>
                <HottestNews />
                <Navigation />
                <Gallery data={news} />
            </main>
        </>
    );
}

export default App;
