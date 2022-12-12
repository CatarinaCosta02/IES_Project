function Card(){
    return (
        <>
            <div className="card w-96 bg-blue-200 shadow-xl">
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-black">
                    Shoes!
                    <div className="badge badge-secondary ">NEW</div>
                        </h2>
                        <p className="text text-gray-600" >If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <div className="badge badge-outline text-gray-600">Fashion</div> 
                    <div className="badge badge-outline text-gray-600">Products</div>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Card;