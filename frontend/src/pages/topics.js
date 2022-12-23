import styles from "../styles/topics.module.scss"
import HottestNews from "../components/hottest";
import Navigation from "../components/navigation";
import Gallery from "../components/gallery";

import tech from "../images/tech.png";
import fashion from "../images/fashion.png";
import sports from "../images/sports.png";
import health from "../images/health.png";


function Topics() {
    const topics = [
        "fashion",
        "technology",
        "sports",
        "health"
    ]

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
                        <button key={index}>{topic}</button>
                    ))}
                </div>
            </div>

            <main className={styles.main}>
                <HottestNews />
                <Navigation />
                <Gallery />
            </main>
        </>
    );
}

export default Topics;