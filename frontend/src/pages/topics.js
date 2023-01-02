import styles from "../styles/topics.module.scss"
import HottestNews from "../components/hottest";
import Navigation from "../components/navigation";
import Gallery from "../components/gallery";

import tech from "../images/tech.png";
import fashion from "../images/fashion.png";
import sports from "../images/sports.png";
import health from "../images/health.png";
import {useEffect, useState} from "react";


function Topics() {
    const topics = [];
    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/api/topics";
        fetch(url, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                topics.push(...data);
            })
            .catch(error => {
                console.error(error);
            });
    });

    const [gallery, setGallery] = useState([]);

    const onTopicChange = (newTopic) => {
        let url = process.env.REACT_APP_API_URL + "/api/search/topics";
        let params = new URLSearchParams();
        params.append("query", newTopic);

        fetch(url + "?" + params.toString(), {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setGallery(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles.mainBody}>
                    <h1>All Topics</h1>
                    <div className={styles.images}>
                        <img src={tech} alt="technology logo" />
                        <img src={fashion} alt="fashion logo" />
                        <img src={sports} alt="sports logo" />
                        <img src={health} alt="health logo" />
                    </div>
                </div>
                <div className={styles.buttonList}>
                    <p>Topic Selection</p>
                    {topics.map((topic, index) => (
                        <button key={index} onClick={() => onTopicChange(topic)}>{topic}</button>
                    ))}
                </div>
            </div>

            <main className={styles.main}>
                <HottestNews />
                <Navigation active="Topics" />
                <Gallery data={gallery} />
            </main>
        </>
    );
}

export default Topics;