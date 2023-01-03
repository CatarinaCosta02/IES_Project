import styles from "../styles/gallery.module.scss"
import RedditCard from "./redditCard";
import HnCard from "./hnCard";
import NYTCard from "./nytCard";


function Gallery({ data }) {
    return (
        <div className={styles.gallery}>
            {data.map((article, index) => (
                article.source.toLowerCase().indexOf("reddit") === 0 ? <RedditCard key={index} title={article.title} url={article.permalink} topic={article.topic} desc={article.description} /> :
                article.source.toLowerCase().indexOf("hn") === 0 ? <HnCard key={index} title={article.title} url={article.permalink} topic={article.topic} desc={article.description} /> :
                article.source.toLowerCase().indexOf("nyt") === 0 ? <NYTCard key={index} title={article.title} url={article.permalink} topic={article.topic} desc={article.description} /> :
                null
            ))}
        </div>
    )
}

export default Gallery;