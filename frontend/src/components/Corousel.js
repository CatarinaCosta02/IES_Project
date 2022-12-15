
function Corousel({ isLogged }) {


    return (
        <>
            <div className="carousel w-full bg-white">
                <div id="item1" className="carousel-item w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                    <div className="hero-content flex-col lg:flex-row-reverse">

                    </div>
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                    <div className="hero-content flex-col lg:flex-row-reverse">
                    </div>
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src="https://placeimg.com/800/200/arch" className="w-full" />
                    <div className="hero-content flex-col lg:flex-row-reverse">
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2 bg-white">
                <a href="#item1" className="btn btn-xs btn-info">1</a>
                <a href="#item2" className="btn btn-xs btn-info">2</a>
                <a href="#item3" className="btn btn-xs btn-info">3</a>
                <a href="#item4" className="btn btn-xs btn-info">4</a>
            </div>
        </>
    )
}

export default Corousel;