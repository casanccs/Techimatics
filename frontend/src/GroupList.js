import './GroupList.css'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ListItem from './ListItem'

export default function GroupList(){
    let [groups, setGroups] = useState([])

    useEffect(() => {
        getGroups()
    }, [])

    let getGroups = async () => {
        let response = await fetch('/api/groups/', {
            method: 'GET',
        })
        let data = await response.json()
        setGroups(data)
    }

    return(
        //The line underneath should be seen only by Staff members
        <div className="GroupList">
            <h1>Welcome to the Group List Page!</h1>
            <Link to="/group/new">Create a Group</Link>
            <div className="grid">
                {groups.map((group, index) => (
                        <ListItem key={index} group={group} className="ListItem" />
                    ))}
            </div>
        </div>
    )
}