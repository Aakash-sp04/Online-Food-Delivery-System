import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import location from "../location.svg"

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let [address, setAddress] = useState("");
    let navigate = useNavigate()

    //For fetching accurate user location on one-click
    const handleClick = async (e) => {
        e.preventDefault();
        let navLocation = () => {
            return new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej);
            });
        }
        let latlong = await navLocation().then(res => {
            let latitude = res.coords.latitude;
            let longitude = res.coords.longitude;
            return [latitude, longitude]
        })
        // console.log(latlong)
        let [lat, long] = latlong
        console.log(lat, long)
        const response = await fetch("http://localhost:5000/api/getlocation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latlong: { lat, long } })

        });
        const { location } = await response.json()
        console.log(location);
        setAddress(location);
        setCredentials({ ...credentials, [e.target.name]: location })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //It is synthetic event
        console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }));

        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //To send data to backend
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid username or password");
        }
        else {
            navigate("/login")
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className=' col d-flex justify-content-center m-4'>
                        <div className="card p-1 w-50 bg-success">
                            <div className="card p-4 w-100">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" placeholder='Name should contain atleast 3 characters' value={credentials.name} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id='exapleInputEmail1' aria-describedby='emailHelp' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" name='password' placeholder='Password should be atleast 5 characters' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                                    <fieldset>
                                        <input type="text" className="form-control" name='address' placeholder='Click below for tracking your current location' value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" />
                                    </fieldset>

                                    <div className="mt-3">
                                        <button type="button" onClick={handleClick} name="geolocation" className="text-white btn btn-success">Track Current Location <img src={location} alt='' /></button>
                                    </div>
                                </div>

                                {/*For buttons*/}
                                <table align='center'>
                                    <tr>
                                        <td>
                                            <button type="submit" className="my-2 btn btn-success text-white">Submit</button>
                                        </td>
                                        <td>
                                            <Link to="/login" className='mx-3 btn btn-danger'>Already a User</Link>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}
