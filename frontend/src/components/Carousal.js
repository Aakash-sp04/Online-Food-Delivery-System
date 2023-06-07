import React from 'react'

export default function Carousal() {
    return (
        <div>
            {/* !important for css overiding */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit : "contain !important"}}>
                
                <div className="carousel-inner" id='carousel'>
                    {/* zIndex is used because caurousal which is use later overshadow search-box so, to make
                        search-box visible we use z-index = 10 so, it visible over carousel
                    */}
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        {/* Search bar */}
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success zoom-btn text-white" type="submit">Search</button>
                        </form>
                    </div>

                    {/* Caurousel Items */}
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>

                {/* Buttons for motion */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
