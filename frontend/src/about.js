import { useState } from "react";
import logo from "./images/About2.jpg";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Card from "./components/Card";
import logo2 from "./images/logo_b.png";
import Bottom from "./components/Bottom";





function About() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar isLogged={true} />
            <div className="hero max-h-screen/4 bg-black mb-0">
                <img src={logo} alt="cidade" className="mx-auto max-w-3xl" />
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h1 className="text-7xl font-bold py-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" >About Us</h1>
                    </div>
                </div>
                
            </div>

            <div className="grid place-content-center h-32 bg-white mb-0">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h2 className="mx-auto text-4xl font-bold py-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700" >Quality news, where you want it, when you want it.</h2>
                    </div>
                </div>
                
            </div>

            <div className="grid place-content-center h-24 bg-white mb-0">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <p class="text-center w-2/3 text-gray-600 mx-auto">Our web application was designd to be used by ordinary people. No matter how old they are or what job they have or what they are interested in - because there is one thing that connects us against all differences - the news.</p>
                    </div>
                </div>
                
            </div>

            <div className="grid place-content-center h-24  bg-white mb-0">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <p class="text-center w-2/3 text-gray-600 mx-auto">We always want to be informed about the current situations and latest trends in our world or our country. However, we have also to take into consideration that each person has different interests and priorities. That’s why our application is gonna personalize the news for each and every single user, because everyone is important to us. </p>
                    </div>
                </div>    
            </div>

            <div className="grid place-content-center h-24  bg-white mb-0">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <p class="text-center w-2/3 text-gray-600 mx-auto">There are many news websites around the world, but ours takes a more important place in the user's needs. We know that the whole process of finding suitable information can be too demanding and exhausting for many people, so our goal is to make it as simple as possible. Because you deserve to be well informed and not to spend time on scrolling the pages with improper and completely useless information. </p>
                    </div>
                </div>    
            </div>

            <div className="grid place-content-center h-24  bg-white mb-0">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <p class="text-center w-2/3 text-gray-600 mx-auto">We want to make your life easier and we are willing to do the worst part of finding the news from different sites and prepare the feedback with the results, just for you. </p>
                    </div>
                </div>    
            </div>

            <Bottom/>
            <Footer />
        </>

    );
}

export default About;