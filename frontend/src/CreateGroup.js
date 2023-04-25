import './CreateGroup.css'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

export default function CreateGroup({profile}) {

    let groupId = useParams()['groupId']; 
    let [group, setGroup] = useState()
    let content;
    console.log("Profile: ", profile)
    if (!profile){
        window.location.replace('/groups/')
    }

    let createGroup = async () => {
        console.log(group);
        let response = await fetch('/api/group/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify(group)
        })
        console.log(response)
    }

    let deleteGroup = async () => { //Note, need to redirect
        await fetch(`/api/group/${group.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
        })
        console.log(group)
    }

    let handleSubmit = () => {
        group['day'] = document.querySelector('#day').value;
        group['level'] = document.querySelector('#level').value;
        group['startTime'] = document.querySelector('#startTime').value;
        group['endTime'] = document.querySelector('#endTime').value;
        if (groupId !== 'new') {
            //deleteGroup()
        } else if (groupId !== 'new') {
            //updateGroup()
        } else if (groupId === 'new') {
            createGroup()
        }
    }


    let getGroup = async () => {
        if (groupId === 'new') return
        let response = await fetch(`/api/group/${groupId}`)
        if (response.status === 500){
            console.log(response.status)
            window.location.replace('/groups/')
        }
        let data = await response.json()
        setGroup(data)
    }
    useEffect(() => {
        getGroup()
    },[groupId])
    if (profile && group){
        if (group['owner'] != profile['profile']['user']){
            console.log("Not your group!")
            window.location.replace('/groups/')
        }
    }
    if (groupId == 'new'){
        return (
            <div className="CreateGroup">
                <label>Day: </label><input type="text" id="day" />
                <label>Time: </label><div className='time'><input type="text" id="startTime" /> - <input type="text" id="endTime" /></div>
                <label>Level: </label><input type="text" id="level" />
                <div></div>
                <input className = "button" type="button" value="Create Group" onClick={handleSubmit} />
            </div>   
        )
    }
    else{
        return (
            <div className="GroupDetail">
                <input id="delete" type='button' value="Delete Group" onClick={deleteGroup} />
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