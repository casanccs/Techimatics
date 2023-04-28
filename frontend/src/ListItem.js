import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ListItem.css'

export default function ListItem({group, owner, ind, requests}) {

    const [req, setReq] = useState()

    function request(e){
        if (e.target.style.backgroundColor === "blue" || e.target.style.backgroundColor === "red"){
            e.target.style.backgroundColor = "white"
        }
        else{
            e.target.style.backgroundColor = "blue"
        }
        fetch(`/api/request/${group.id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
        }).then((response) => {
            setReq(response.json())
            console.log(req)
        })
    }

    if (owner){
        console.log("Owner: ", group.owner)
        if (owner['profile']['user'] == group.owner){
            console.log("You own this")
            return (
                <Link to={`/group/${group.id}`}>
                    <div className="ListItem owned">
                        <h3>{group.day}</h3>
                        <h4>{group.startTime} - {group.endTime}</h4>
                        <p>{group.level}</p>
                        <p>By: {group.owner}</p>
                        <p># of people: {group.num}</p>
                    </div>   
                </Link>
            )
        }
    }

    console.log(requests, group.id.toString())
    /* if (requests){
        for (var i = 0; i < requests.length; i++){

        }
    } */
    if ( requests && arrayAlreadyHasArray(requests, [group.id.toString(), "Pending"])){
        console.log("I am in here")
            return (
                <div className="ListItem" onClick={request} style={{backgroundColor:"blue"}}>
                    <h3>{group.day}</h3>
                    <h4>{group.startTime} - {group.endTime}</h4>
                    <p>{group.level}</p>
                    <p>By: {group.owner}</p>
                    <p># of people: {group.num}</p>
                </div>   
            )
    }
    if ( requests && arrayAlreadyHasArray(requests, [group.id.toString(), "Accepted"])){
        console.log("I am in here")
            return (
                <Link to={`/group/${group.id}`}>
                    <div className="ListItem" style={{backgroundColor:"green"}}>
                        <h3>{group.day}</h3>
                        <h4>{group.startTime} - {group.endTime}</h4>
                        <p>{group.level}</p>
                        <p>By: {group.owner}</p>
                        <p># of people: {group.num}</p>
                    </div>   
                </Link>
            )
    }
    if ( requests && arrayAlreadyHasArray(requests, [group.id.toString(), "Rejected"])){
        console.log("I am in here")
            return (
                <div className="ListItem" onClick={request} style={{backgroundColor:"red"}}>
                    <h3>{group.day}</h3>
                    <h4>{group.startTime} - {group.endTime}</h4>
                    <p>{group.level}</p>
                    <p>By: {group.owner}</p>
                    <p># of people: {group.num}</p>
                </div>   
            )
    }
    if (owner){
        return (
            <div className="ListItem" onClick={request}>
                <h3>{group.day}</h3>
                <h4>{group.startTime} - {group.endTime}</h4>
                <p>{group.level}</p>
                <p>By: {group.owner}</p>
                <p># of people: {group.num}</p>
            </div>   
        )
    }
    else{
        return (
            <div className="ListItem">
                <h3>{group.day}</h3>
                <h4>{group.startTime} - {group.endTime}</h4>
                <p>{group.level}</p>
                <p>By: {group.owner}</p>
                <p># of people: {group.num}</p>
            </div>   
        )
    }
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


  function arrayAlreadyHasArray(arr, subarr){
    for(var i = 0; i<arr.length; i++){
        let checker = false
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === subarr[j]){
                checker = true
            } else {
                checker = false
                break;
            }
        }
        if (checker){
            return true
        }
    }
    return false
}