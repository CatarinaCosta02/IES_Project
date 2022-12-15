

import logo2 from "../images/logo_b.png";


function Bottom({ isLogged }) {

    
    return (
        <>
            <div className="grid place-content-center h-200  bg-white mb-0">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                    <img src={logo2} alt="cidade" className="h-[11rem] w-[10rem]" />
                    </div>
                </div>    
            </div>
        </>
    )
}

export default Bottom;