import styles from "../styles/reddit.module.scss"
import reddit from "../images/reddit.png";
import {Link} from "react-router-dom";


function HnCard({ title, url, topic, desc }) {
    return (
        <Link to={url} className={styles.card}>
            <div className={styles.banner}>
                <img src={reddit} alt="HackerNews" />
            </div>
            <div className={styles.content}>
                <h3>{title}</h3>
                <small>{topic}</small>
                <p>{desc}</p>
            </div>
        </Link>
    );
}

export default HnCard;
