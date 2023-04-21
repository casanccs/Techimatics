import './CreateGroup.css'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

export default function CreateGroup(params) {

    let groupId = useParams()['groupId']; 
    let group = {};
    let content;

    let createGroup = async () => {
        console.log(group);
        let response = await fetch('/api/group/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
        console.log(response)
    }

    let deleteGroup = async () => {
        await fetch(`/api/group/${group.id}`, {
            method: 'DELETE',
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
        let data = await response.json()
        group = data
    }
    useEffect(() => {
        getGroup()
    },[groupId])
   
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