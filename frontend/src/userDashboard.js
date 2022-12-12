import { useState } from "react";
import logo from "./images/logo_b.png";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";
import cat from "./images/cat.jpg";
import Card2 from "./components/Card2";



function UserDashboard() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <section className="hero min-h-screen/2 bg-black mb-0">
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
                <div className="grid place-content-center bg-white">

                    {search.length === 0 && (
                        <>
                            <h2 className="text-2xl text-black py-4">For You</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-6xl ">
                                <Card2 />
                                <Card2 />
                                <Card2 />
                            </div>

                            <h2 className="text-2xl text-black py-4">Top News</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-6xl ">
                                <Card2 />
                                <Card2 />
                                <Card2 />
                            </div>

                        </>
                    )}
                </div>

                <div className="grid place-content-center h-42 bg-white">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div>
                            <h2 className="mx-auto text-4xl font-bold py-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" >Topics that might interest you</h2>
                        </div>
                    </div>

                </div>

                <div className="grid place-content-center bg-white">

                    {search.length === 0 && (
                        <>
                            <h2 className="text-2xl text-black py-4">Sports</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                <Card />
                                <Card />
                                <Card />
                            </div>

                            <h2 className="text-2xl text-black py-4">Beauty</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto max-w-8xl ">
                                <Card />
                                <Card />
                                <Card />
                            </div>

                            <h3 className="text-2xl text-black py-4">Technology</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto max-w-8xl ">
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