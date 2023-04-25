import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ListItem({group, owner, ind}) {

    const [req, setReq] = useState()

    function request(e){
        e.target.style.backgroundColor = "blue"
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
        console.log("Owner: ", owner['profile']['user'])
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