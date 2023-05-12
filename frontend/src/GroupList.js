import './GroupList.css'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ListItem from './ListItem'

export default function GroupList({profile}){
    console.log("Profile from top of list: ", profile)
    let [groups, setGroups] = useState([])
    let [requests, setRequests] = useState([])
    let [relist, setRelist] = useState([])
    
    useEffect(() => {
        fetch('/api/groups/', {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("Info",data, profile)
            //Its possible the data is {'groups', 'requests'} but 'profile' is empty

            if (profile){
                console.log("Data:" , data)
                if (profile['profile']['pType'] === "Customer"){
                    console.log("In customer", data['groups'])
                    setGroups(data['groups'])
                    setRequests(data['requests'])
                }
                else{
                    console.log("Staff", data)
                    setGroups(data)
                }
            }
            else{
                console.log("Data 2:" , data)
                if (data && !Array.isArray(data)){ //Check to see if the data type is a dict or array
                    setGroups(data['groups'])
                    console.log("I in 1:" ,requests)
                    setRequests(data['requests'])
                    console.log("I in 2:" ,requests)
                }
                else{
                    setGroups(data)
                    console.log("Trying to set groups...")
                }
            }
        })
    }, [])
    
    useEffect(() => {
        var temp = []
        for (var i = 0; i < requests.length; i++){
            console.log(requests[i]['group'])
            temp.push([requests[i]['group'], requests[i]['status']])
        }
        setRelist(temp)
        console.log(requests, temp)
    }, [requests])
    console.log("groups:", groups)
    if (profile){
        if (profile['profile']['pType'] !== "Customer"){ //This happens when they are Staff
            return(
                //The line underneath should be seen only by Staff members
                <div className="GroupList">
                    <h1>Welcome to the Group List Page!</h1>
                    <Link id="cGroup" to="/group/new">Create a Group</Link>
                    
                    <div className="grid">
                        {groups != [] ? (groups.map((group, index) => (
                                <ListItem key={index} group={group} className="ListItem" owner={profile} requests={relist} />
                            ))): (
                                <p></p>
                            )}
                    </div>
                </div>
            )
        }
        else{
            return(
                //This runs if they are Customers
                <div className="GroupList">
                    <h1>Welcome to the Group List Page!</h1>
                    <h4>Click on a white-colored group to request to join the group!</h4>
                    <h4><span style={{color: 'blue'}}>Blue</span> group means you requested and the owner must accept or reject. Click again to remove request.</h4>
                    <h4><span style={{color: 'red'}}>Red</span> group means you were rejected. Click to remove request.</h4>
                    <h4><span style={{color: 'green'}}>Green</span> group means you were accepted. Click on it to enter the group page.</h4>
                    <div className="grid">
                            {groups != [] ? (groups.map((group, index) => (
                                <ListItem key={index} group={group} className="ListItem" owner={profile} requests={relist} />
                            ))): (
                                <p></p>
                            )}
                    </div>
                </div>
            )
        }
    }
    return( //This happens if they are not logged in
        <div className="GroupList">
                <h1>Welcome to the Group List Page!</h1>
                <div className="grid">
                            {groups != [] ? (groups.map((group, index) => (
                                <ListItem key={index} group={group} className="ListItem" owner={profile} requests={relist} />
                            ))): (
                                <p></p>
                            )}
                </div>
        </div>
    )
}