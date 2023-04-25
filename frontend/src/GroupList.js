import './GroupList.css'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ListItem from './ListItem'

export default function GroupList({profile}){
    console.log("Profile from top of list: ", profile)
    let [groups, setGroups] = useState([])
    var cust
    if (profile){
        cust = profile['profile']['pType'] === "Customer"
    }
    else{
        cust = false
    }
    useEffect(() => {
        getGroups()
    }, [])

    let getGroups = async () => {
        let response = await fetch('/api/groups/', {
            method: 'GET',
        })
        let data = await response.json()
        console.log(data)
        console.log("Profile inside: ", profile)
        if (profile){
            if (cust){
                setGroups(data['groups'])
            }
            else{
                setGroups(data)
            }
        }
        else{
            setGroups(data)
        }
        console.log("Groups: ", groups)
    }
    if (profile){
        if (profile['profile']['pType'] !== "Customer"){ //This happens when they are Staff
            return(
                //The line underneath should be seen only by Staff members
                <div className="GroupList">
                    <h1>Welcome to the Group List Page!</h1>
                    <Link to="/group/new">Create a Group</Link>
                    <div className="grid">
                        {groups.map((group, index) => (
                                <ListItem key={index} group={group} className="ListItem" owner={profile} />
                            ))}
                    </div>
                </div>
            )
        }
        else{
            return(
                //This runs if they are Customers
                <div className="GroupList">
                    <h1>Welcome to the Group List Page!</h1>
                    <div className="grid">
                        {groups.map((group, index) => (
                                <ListItem key={index} group={group} className="ListItem" owner={profile} />
                            ))}
                    </div>
                </div>
            )
        }
    }
    return( //This happens if they are not logged in
        <div className="GroupList">
                <h1>Welcome to the Group List Page!</h1>
                <div className="grid">
                    {groups.map((group, index) => (
                            <ListItem key={index} group={group} className="ListItem" owner={profile} />
                        ))}
                </div>
        </div>
    )
}