import { useState } from "react";
import logo from "./images/w.jpg";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";
import Bottom from "./components/Bottom";
import Flag from "./components/Flag";


function Country() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <div className="hero max-h-screen/4 bg-black mb-0">
                <img src={logo} alt="cidade" className="mx-auto max-w-3xl" />
                <div className="hero-content flex-col lg:flex-row-reverse">
                </div>
            </div>
            <section>
                <Flag/>
                <div className="grid place-content-center h-42 bg-white">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div>
                            <h2 className="justify-center text-4xl font-bold py-7 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" >Top Trends!</h2>
                        </div>
                    </div>

                </div>
                <div className="mx-auto bg-white">
                    <div className="grid place-content-center bg-white">


                        {search.length === 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <Card />
                                    <Card />
                                    <Card />
                                </div>

                            </>
                        )}
                        
                    </div>
                </div>

                <div className="mx-auto bg-white ">
                    <div className="grid place-content-center bg-white">
                        <h1 className="text-7xl font-bold py-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" ></h1>


                        {search.length === 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <Card />
                                    <Card />
                                    <Card />
                                </div>

                            </>
                        )}
                        
                    </div>
                </div>

                <div className="mx-auto bg-white ">
                    <div className="grid place-content-center bg-white">
                        <h1 className="text-7xl font-bold py-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" ></h1>


                        {search.length === 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <Card />
                                    <Card />
                                    <Card />
                                </div>

                            </>
                        )}
                        
                    </div>
                </div>



            </section>

            <Bottom />
            <Footer />
        </>

    );
}

export default Country;