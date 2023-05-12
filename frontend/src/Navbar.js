import './Navbar.css'
import logo from './assets/Logo3.png'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props, {profile}){
    console.log("In navbar:",profile)

    async function logout(e){
        e.preventDefault()
        console.log("Fetching")
        let response = await fetch('/api/logout/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
        }).then(function(){
            props.onSubmit2()
            console.log("On submit 2")
        })
        console.log(response)
        window.location.replace('/login')
    }

    
    if (props.stat){ //logged in
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
                <a href="/account"><h2 id="account">Account</h2></a>
    
    
                <Link to={'/login'}><h2 id='topright' onClick={logout}>Logout</h2></Link>
    
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
        )
    }
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


            <a href="/login"><h2 id='topright'>Create Profile/Login</h2></a>

            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
        </div>
    )
}



function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }