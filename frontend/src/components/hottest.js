import styles from "../styles/hottest.module.scss"


function HottestNews() {
    return (
        <div className={styles.card}>
            <h3>Hottest News</h3>
            <ul>
                <li>News 1</li>
                <li>News 2</li>
                <li>News 3</li>
            </ul>
        </div>
    );
}

export default HottestNews;