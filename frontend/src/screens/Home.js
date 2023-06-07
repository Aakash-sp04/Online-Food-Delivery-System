import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [search, setSearch] = useState([])
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json();

        setFoodItem(response[0])
        setFoodCat(response[1])
        //response[0] -> FoodItem
        //response[1] -> FoodCategory
        //From DisplayData.js which was send as response in try block
        //console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])  //In [] Depedency to add. If not mention all function are called

    return (
        <div>
            <div><Navbar /></div>

            {/* By React Thumbnail rule component Carousel is not used at any
            other place so, don't make its separate component */}
            <div>
                {/* !important for css overiding */}
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                    <div className="carousel-inner" id='carousel'>
                        {/* zIndex is used because caurousal which is use later overshadow search-box so, to make
                        search-box visible we use z-index = 10 so, it visible over carousel
                    */}
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            {/* Search bar */}
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success zoom-btn text-white" type="submit">Search</button> */}
                            </div>
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


            {/* m = margin */}
            <div className='container'>
                {
                    foodCat !== []  //If data is != Empty array
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== []
                                        ?
                                        //Filter always check for condition & return true
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search)))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodItem={filterItems}
                                                            options={filterItems.options[0]}  //As per DB entry of Object : 0
                                                        ></Card>
                                                    </div>
                                                )
                                            }
                                            ) : <div>Data Not Found</div>}
                                </div>
                            )
                        })
                        : ""
                }
            </div>

            <div><Footer /></div>
        </div>
    )
}
