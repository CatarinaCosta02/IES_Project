import styles from "../styles/main.module.scss"
import HottestNews from "../components/hottest";
import Navigation from "../components/navigation";
import Gallery from "../components/gallery";


function App() {
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
                <Gallery data={[]} />
            </main>
        </>
    );
}

export default App;
