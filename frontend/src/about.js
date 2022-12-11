import { useState } from "react";
import logo from "./images/About2.jpg";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";



function About() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <div className="hero min-h-screen/4 bg-black mb-0">
                <img src={logo} alt="cidade" className="mx-auto max-w-7xl" />
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h1 className="text-7xl font-bold py-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" >About Us</h1>
                    </div>
                </div>
                
            </div>
            <div className="grid place-content-center h-48 bg-white mb-0">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                    <p class="text-center ...">So I started to walk into the water...</p>
                    </div>
                </div>
                
            </div>

            


            <Footer />
        </>

    );
}

export default About;