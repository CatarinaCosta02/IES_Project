import { useState } from "react";
import logo from "./images/logo_b.png";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";
import cat from "./images/cat.jpg";



function UserDashboard() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <section className="hero min-h-screen/2 bg-black mb-12">
                <img src={cat} alt="cidade" className="mx-auto max-w-5xl" />
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={logo} className="max-w-sm rounded-lg lg:ml-9" />
                    <div>
                        <h1 className="text-6xl text-white font-bold py-5">Welcome to What's New</h1>
                        <p className="py-1">Welcome back!</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-auto w-[70%]">

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

export default UserDashboard;