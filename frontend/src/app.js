import logo from './images/logo.png';
import './styles/App.module.scss';
import {useState} from "react";
import Footer from './components/Footer';

function App() {
    const [search, setSearch] = useState("");

    return (
    <>
        <section className="hero min-h-screen bg-base-200 mb-12">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={logo} className="max-w-sm rounded-lg lg:ml-10"/>
                <div>
                    <h1 className="text-7xl font-bold py-6">Welcome back!</h1>
                    <p className="py-1">Keep up to date with everything that's happening around you!</p>
                    <p className="py-1 mb-5"><b>What's New?</b> the only news website you will ever need!</p>
                    <div className="divider" />
                    <div className="flex justify-between">
                        <a href="/register" className="btn btn-primary">Register now</a>
                        <a href="/login" className="btn btn-ghost">Or sign in</a>
                    </div>
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
                <div className="dropdown">
                    <label tabIndex={0} className="btn m-1">Choose topic</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>Beauty</a></li>
                      <li><a>Sports</a></li>
                      <li><a>Games</a></li>
                      <li><a>Politics</a></li>
                    </ul>
                </div>

                { search.length > 0 && (
                    <>
                        <h2 className="text-2xl py-4">Results for {search}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Card Title</h2>
                                    <p className="card-subtitle">Card Subtitle</p>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Card Title</h2>
                                    <p className="card-subtitle">Card Subtitle</p>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                { search.length === 0 && (
                    <>
                        <h2 className="text-2xl py-4">Most recent news</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Card Title</h2>
                                    <p className="card-subtitle">Card Subtitle</p>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Card Title</h2>
                                    <p className="card-subtitle">Card Subtitle</p>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
        <Footer />
      </>
  );
}

export default App;