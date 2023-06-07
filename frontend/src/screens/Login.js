import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  let navigate = useNavigate()  //To goto Home Page on valid login

  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault(); //It is synthetic event
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //To send data to backend
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter valid e-mail or password");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email)  //To store email on local Storage 
      localStorage.setItem("authToken", json.authToken) //Backend Value of authorization we get using json.authToken
      //& store it in variable named 'authToken'
      console.log(localStorage.getItem("authToken")); //& console log it
      navigate("/");  //To goto Home Page on valid login
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>

      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className=' col d-flex justify-content-center m-5'>
            <div className="card p-1 w-30 bg-success">
              <div className="card p-5 w-30">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id='exapleInputEmail1' aria-describedby='emailHelp' />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>

                <button type="submit" className="m-3 btn btn-success text-white">Submit</button>
                <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}
