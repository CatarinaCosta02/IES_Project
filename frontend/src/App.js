import logo from './images/logo.png';
import background from './images/background.jpg';
import './styles/App.module.scss';
import Navbar from "./components/Navbar"

function App() {
  return (
    <div>
        <Navbar />
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage:`url(${background})` }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={logo} className="max-w-sm rounded-lg" style={{padding_left: "50cm" }}/>
                <div>
                    <h1 className="text-7xl font-bold py-6">What's New?</h1>
                    <p className="py-1">Keep Updated whit everything that's happening around you!</p>
                    <p className="py-1 mb-5"><b>What's New?</b> the only news website you will ever need!</p>
                <div className="divider" />
                <button className="mt-5 btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
