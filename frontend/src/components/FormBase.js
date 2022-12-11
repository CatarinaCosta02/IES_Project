
import '../styles/App.module.scss';
import Navbar from "./Navbar";
import cidade from "../images/Cidade.jpg";
import Footer from "./Footer";

function FormBase() {
    return (
        <>

            <Navbar />
            <div className="relative flex h-full w-full">
                <div className="h-screen w-1/2 bg-black">
                    <div className="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
                    </div>
                </div>
                <div className="h-screen w-1/2 bg-blue-600">
                    <img src={cidade} alt="cidade" className="h-full w-full object-cover" />
                </div>
            </div>
            <Footer />
        </>
    );

}

export default FormBase;