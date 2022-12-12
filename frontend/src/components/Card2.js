function Card2() {
    return (
        <>

            <div className="card card-side bg-blue-400 shadow-xl">
                <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" className="justify-items-start h-full" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-gray-600">New movie is released!</h2>
                    <p className="text text-gray-600">Click the button to watch on Jetflix app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-xs btn-active btn-blue-500">See More</button>
                        <button className="btn btn-xs btn-square btn-outline btn-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                        <button className="btn btn-xs btn-square btn-outline ">
                            <svg xmlns="https://www.svgrepo.com/svg/309459/comment" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card2;