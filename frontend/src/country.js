import { useState } from "react";
import logo from "./images/logo_b.png";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";



function Country() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <section className="hero min-h-screen/2 bg-base-200 mb-12">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={logo} className="max-w-sm rounded-lg lg:ml-10" />
                    <div>
                        <h1 className="text-7xl font-bold py-6">Welcome to What's New</h1>
                        <p className="py-1">Welcome back!</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-auto w-[70%]">
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

            <Footer />
        </>

    );
}

export default Country;