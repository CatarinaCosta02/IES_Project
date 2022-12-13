
function Card2() {
    return (
        <>

            <div className="card card-side bg-gray-300 shadow-xl rounded-none">
                <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" className="justify-items-start h-full" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-black">New movie is released!</h2>
                    <p className="text text-gray-600">Click the button to watch on Jetflix app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-xs btn-active bg-base-300">See More</button>
                        <button className="btn btn-xs btn-square btn-outline btn-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                        <button className="btn btn-xs btn-square btn-outline btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card2;