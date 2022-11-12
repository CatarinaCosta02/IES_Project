import {useState} from "react";
import logo from "./images/logo.png";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";



function UserDashboard() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <section className="hero min-h-screen/2 bg-base-200 mb-12">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={logo} className="max-w-sm rounded-lg lg:ml-10"/>
                    <div>
                        <h1 className="text-7xl font-bold py-6">Welcome to What's New</h1>
                        <p className="py-1">Welcome back!</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-auto w-[70%]">
                    <div className="form-control">
                        <input type="text"
                               placeholder="Search"
                               className="input input-bordered"
                               value={search}
                               onInput={e => setSearch(e.target.value)}
                        />
                    </div>

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
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-subtitle">Card Subtitle</p>
                                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. Quisquam, quae.</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {search.length === 0 && (
                        <>
                            <h2 className="text-2xl py-4">Most recent news</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-subtitle">Card Subtitle</p>
                                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. Quisquam, quae.</p>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-subtitle">Card Subtitle</p>
                                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. Quisquam, quae.</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section id="reddit">
                <h2 className="text-2xl py-4">Reddit news</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="hackernews">
                <h2 className="text-2xl py-4">Hacker News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="instagram">
                <h2 className="text-2xl py-4">Instagram</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p className="card-subtitle">Card Subtitle</p>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, quae.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
        
    );
}

export default UserDashboard;