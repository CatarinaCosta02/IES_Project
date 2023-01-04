import styles from "../styles/hottest.module.scss"
import {useEffect, useState} from "react";


function HottestNews() {
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
        <div className={styles.card}>
            <h3>Hottest News</h3>
            <ul>
                {news.map((item, index) => (
                    <li key={index}>item.title</li>
                ))}
            </ul>
        </div>
    );
}

export default HottestNews;