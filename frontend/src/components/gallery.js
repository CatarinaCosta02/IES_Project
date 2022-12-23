import styles from "../styles/gallery.module.scss"
import RedditCard from "./redditCard";


function Gallery() {
    return (
        <div className={styles.gallery}>
            <RedditCard title="A reddit history #1" topic="fashion" desc="Noice" />
            <RedditCard title="A reddit history #2" topic="fashion" desc="Noice" />
            <RedditCard title="A reddit history #3" topic="fashion" desc="Noice" />
            <RedditCard title="A reddit history #4" topic="fashion" desc="Noice" />
            <RedditCard title="A reddit history #5" topic="fashion" desc="Noice" />
        </div>
    )
}

export default Gallery;