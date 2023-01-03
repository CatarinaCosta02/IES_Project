import map from '../data/topology.json';
import {GeoJSON, MapContainer} from "react-leaflet";
import {createRef, useEffect, useState} from "react";
import styles from '../styles/choropleth.module.scss';


function ChoroplethMap({ onChange }) {
    const [country, setCountry] = useState(null);
    const [mapKey, setMapKey] = useState(0);

    const [usefulCountries, setUsefulCountries] = useState([]);
    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/api/countries";
        fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setUsefulCountries(data);
        })
        .catch(error => {
            console.error(error);
        });
    });

    let mapRef = createRef();
    return (
        <div className={styles.container}>
            <div className={styles.map}>
                <MapContainer
                    ref={mapRef}
                    key={mapKey}
                    center={country ? country.getBounds().getCenter() : [0, 0]}
                    zoom={1.5}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    touchZoom={false}
                    keyboard={false}
                    zoomControl={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <GeoJSON
                        data={map}

                        style={{
                            fillColor: '#EBEBEB',
                            fillOpacity: 1,
                            weight: 0.5,
                            stroke: true,
                            color: '#000000'
                        }}
                        onEachFeature={(c, layer) => {
                            if (country && country.feature.properties.name === c.properties.name) {
                                console.log(country.feature);
                                layer.setStyle({
                                    fillColor: '#650a0a',
                                    color: '#333',
                                    dashArray: '',
                                    fillOpacity: 0.7
                                });
                            }

                            layer.on({
                                click: e => {
                                    if (country) {
                                        country.setStyle({
                                            fillColor: '#EBEBEB',
                                            fillOpacity: 1,
                                            weight: 0.5,
                                            stroke: true,
                                            color: '#000000'
                                        });
                                    }

                                    setCountry(e.target);
                                    onChange(c.properties.name);
                                    setMapKey(mapKey + 1);
                                }
                            })
                        }}
                    />
                </MapContainer>
            </div>
            <div className={styles.list}>
                <h3>Countries</h3>

                <div className={styles.buttonLst}>
                    {usefulCountries.map(c =>
                        <button
                            key={c}
                            value={c}
                            className={country && country.feature.properties.name === c ? styles.selected : ""}
                            onClick={e => {
                                const countries = mapRef.current._layers;
                                const countrySelected = Object.values(countries).find(c => c.feature && c.feature.properties.name === e.target.value);

                                if (country) {
                                    country.setStyle({
                                        fillColor: '#EBEBEB',
                                        fillOpacity: 1,
                                        weight: 0.5,
                                        stroke: true,
                                        color: '#000000'
                                    });
                                }
                                setCountry(countrySelected);
                                onChange(e.target.value);
                                countrySelected.setStyle({
                                    fillColor: '#650a0a',
                                    color: '#333',
                                    dashArray: '',
                                    fillOpacity: 0.7
                                });
                                countrySelected.bringToFront();
                                setMapKey(mapKey + 1);
                            }}
                        >
                            {c}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChoroplethMap;