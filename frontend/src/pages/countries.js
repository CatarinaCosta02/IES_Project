import MapPicker from "../components/choroplethMap";

import styles from "../styles/countries.module.scss"
import {useState} from "react";
import HottestNews from "../components/hottest";
import Navigation from "../components/navigation";
import Gallery from "../components/gallery";



function Countries() {
    const [gallery, setGallery] = useState([]);

    const onCountryChange = (newCountry) => {
        let url = process.env.REACT_APP_API_URL + "/api/search/countries";
        let params = new URLSearchParams();
        params.append("country", newCountry);

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
            <div className={styles.picker}>
                <MapPicker onChange={onCountryChange} />
            </div>

            <main className={styles.main}>
                <HottestNews />
                <Navigation active="Countries" />
                <Gallery data={gallery} />
            </main>
        </>
    );
}

export default Countries;