import MapPicker from "../components/choroplethMap";

import styles from "../styles/countries.module.scss"
import {useState} from "react";
import HottestNews from "../components/hottest";
import Navigation from "../components/navigation";
import Gallery from "../components/gallery";



function Countries() {
    const [country, setCountry] = useState(null);

    return (
        <>
            <div className={styles.picker}>
                <MapPicker onChange={setCountry} />
            </div>

            <main className={styles.main}>
                <HottestNews />
                <Navigation active="Countries" />
                <Gallery data={[]} />
            </main>
        </>
    );
}

export default Countries;