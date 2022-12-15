import { useState } from "react";
import logo from "./images/w.jpg";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";
import Bottom from "./components/Bottom";



function Country() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <div className="hero max-h-screen/4 bg-black mb-0">
                <img src={logo} alt="cidade" className="mx-auto max-w-3xl" />
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h1 className="text-7xl font-bold py-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" >Country</h1>
                    </div>
                </div>    
            </div>
            <section>
                <div className="mx-auto bg-white">
                    {search.length > 0 && (
                        <>
                            <h2 className="text-2xl py-4">Results for {search}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-subtitle">Card Subtitle</p>
                                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. Quisquam, quae.</p>
                                        <a href="/dashboard/news">Join discussion</a>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-subtitle">Card Subtitle</p>
                                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. Quisquam, quae.</p>
                                        <a href="/dashboard/news">Join discussion</a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {search.length === 0 && (
                        <>
                            <h2 className="text-2xl py-4">News</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                                <Card />
                                <Card />
                                <Card />
                            </div>

                            <h2 className="text-2xl py-4">Politics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                                <Card />
                                <Card />
                                <Card />
                            </div>

                            <h2 className="text-2xl py-4">Beauty</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Card />
                                <Card />
                                <Card />
                            </div>

                            <h2 className="text-2xl py-4">Sports</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Card />
                                <Card />
                                <Card />
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Bottom/>
            <Footer />
        </>

    );
}

export default Country;