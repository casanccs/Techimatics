import './Navbar.css'
import logo from './assets/Logo3.png'
import React, { useState, useEffect } from 'react'

let data;
export default function Navbar(props){

    let [status, setStatus] = useState([])

    let getStatus = async () => {
        let response = await fetch('/api/checkStatus/', {
            method: 'GET',
        })
        data = await response.json()
        setStatus(data)
        console.log(data)
    }
    useEffect(() => {
        getStatus()
    }, [])
    return(
        <div className="Navbar">
            <a href='http://google.com'>
                <img className="logo" src={logo}/>
                <h1>Techimatics</h1>
            </a>
            <div className="bar"></div>
            <a href="/"> <h2 id="home">Home</h2> </a>
            <a href="http://google.com"> <h2 id="htgs">How To Get Started</h2> </a>
            <a href="/contactUs"> <h2 id="contact">Contact Us</h2> </a>
            <a href="/groups"> <h2 id="groups">Group List</h2> </a>


            <a href="/login"><h2 id='topright'>Login/Create Profile</h2></a>

            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            {setTimeout(() => makeGreen(props.cur), 70)}
        </div>
    )
}

function makeGreen(id){
    if (document.getElementById(id)){
        document.getElementById(id).style.color = "rgb(0,255,0)"
    }
    else{
        console.log("It failed")
    }
}