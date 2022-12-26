import styles from "../styles/gallery.module.scss"
import RedditCard from "./redditCard";


function Gallery({ data }) {
    return (
        <div className={styles.gallery}>
            {data.map((article, index) => (
                <RedditCard key={index} title={article.title} url={article.url} topic={article.topic} desc={article.description} />
            ))}
        </div>
    )
}

export default Gallery;