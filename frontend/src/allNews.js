import { useState } from "react";
import logo from "./images/About2.jpg";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";
import Bottom from "./components/Bottom";
import Corousel from "./components/Corousel";



function AllNews() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <Corousel/>
            <Bottom />
            <Footer />
        </>

    );
}

export default AllNews;