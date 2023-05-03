import './CreateGroup.css'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

export default function CreateGroup({profile}) {

    let groupId = useParams()['groupId']; 
    let [group, setGroup] = useState()
    let [requests, setRequests] = useState([])
    let [attendees, setAttendees] = useState([])
    let [messages, setMessages] = useState([])
    let content;
    console.log("Profile: ", profile)

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
    async function reject(e){
        e.currentTarget.parentNode.style.display = "none"
        //Get the username of the person who I rejected
        let name = e.currentTarget.parentNode.children[0].innerText
        console.log(name)
        let response = fetch(`/api/requestStatus/${name}/${groupId}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                'status': "Rejected"
            })
        })
        window.location.replace(`/group/${groupId}`)
    }
    async function accept(e){
        e.currentTarget.parentNode.style.display = "none"
        //Get the username of the person who I rejected
        let name = e.currentTarget.parentNode.children[0].innerText
        console.log(name)
        let response = fetch(`/api/requestStatus/${name}/${groupId}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                'status': "Accepted"
            })
        })
        window.location.replace(`/group/${groupId}`)
    }

    async function del(e){
        e.currentTarget.parentNode.style.display = "none"
        let name = e.currentTarget.parentNode.children[0].innerText
        await fetch(`/api/deleteAttendee/${name}/${groupId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
        })
    }

    async function del2(e){
        let name = profile['profile']['user']
        await fetch(`/api/deleteAttendee/${name}/${groupId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
        })
        window.location.replace('/groups')
    }

    async function makeNote(){
        let input = document.querySelector('#box')
        let response = await fetch(`/api/makeMessage/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                "username": profile['profile']['user'],
                "gid": groupId,
                "msg": input.value,
            })
        })
        window.location.replace(`/group/${groupId}`)
    }
    async function deleteMessages(){
        let response = await fetch('/api/deleteMessages/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                "gid": groupId,
            })
        })
        window.location.replace(`/group/${groupId}`)
    }

    function submitKey(e){
        if (e.keyCode == 13){
            makeNote()
        }
    }

    let getGroup = async () => {
        if (groupId === 'new') return
        let response = await fetch(`/api/group/${groupId}`)
        if (response.status === 500){
            console.log(response.status)
            //window.location.replace('/groups/')
        }
        let data = await response.json()
        console.log("Data:", data)
        setGroup(data['group'])
        setAttendees(data['attendees'])
        if (profile && profile['profile']['pType'] === "Staff"){
            setRequests(data['requests'])
        }
        response = await fetch(`/api/messages/${groupId}`)
        data = await response.json() //data: [{'profile': username, 'msg': message}, .... ]
        setMessages(data)
    }
    useEffect(() => {
        getGroup()
    },[profile])
    useEffect(() => {
        console.log(requests)
        console.log(group)
    }, [requests])

    if (profile && group){
        if (group['owner'] != profile['profile']['user']){
            console.log("Not your group!")
            //window.location.replace('/groups/')
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
    else{ //This is where all the info will be put
        //Must include current requests to click them to accept into the group
        console.log("Reqs: ", requests)
        let cur = 
        <div className="GroupDetail">
            <div className='left'>
                <h3 className='own'>Owner: {group ? (group.owner): ("")}</h3>
                {profile && profile['profile']['pType'] === "Staff" ? (
                    
                    <div>
                        <input className="delete" type='button' value="Delete Group" onClick={deleteGroup} />
                        <h3>Requests: </h3>
                        
                        <div className="requests">
                            {empty(requests) ? (
                                requests.map((request, index) => {
                                    if (request.status == "Pending"){
                                    return <div key={index} className="request">
                                        <p request={request}>{request.profile}</p>
                                        <input className="accept" type="button" value="Accept" onClick={accept}/>
                                        <input className="reject" type="button" value="Reject" onClick={reject}/>
                                    </div>
                                    }
                                })
                            ):(
                                <p>*No New Requests*</p>
                            )}
                        </div>

                    </div>
                ) : (
                    <div>
                        <input className="delete" type='button' value="Leave Group" onClick={del2} />
                    </div>
                )}
                
                <h3>Attendees: </h3>
                
                    {profile && profile['profile']['pType'] === "Staff" ? (
                        <div className="attendees">
                            {attendees.length != 0 ? (attendees.map((at, index) => {
                                return <div key={index} className="at">
                                            <p>{at.profile}</p>
                                            <input type="button" value="Delete Person" onClick={del} />
                                        </div>
                            })) : (
                                <p>*No Attendees*</p>
                            )}
                        </div> 
                    ) : (
                        <div className="attendees">
                            {attendees.length != 0 ? (attendees.map((at, index) => {
                                return <div key={index} className="at">
                                            <p>{at.profile}</p>
                                        </div>
                            })) : (
                                <p>*No Attendees*</p>
                            )}
                        </div> 
                    )}
            </div>
            <div className='right'>
                <div className='chat'>
                {messages.map((msg, index) => (
                    <div key={index} className="msg">
                        <span className='name'>{msg.profile}</span>: {msg.msg}
                    </div>
                ))}
                </div>
                <input id="box" type="text" placeholder='Type Message...' onKeyDown={submitKey} autoFocus/>
                <input  type="button" value="Submit" onClick={makeNote} />
                {profile && profile['profile']['pType'] === "Staff" ? (
                    <input id="dMessages" type="button" value="Delete All Messages" onClick={deleteMessages}/>
                ) : (
                    <p></p>
                )}
                <h3>*Refresh Page To See New Messages* </h3>
            </div>
        </div>
            
            return (
                cur
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

function empty(requests){
    var emp = false;
    for (var i = 0; i < requests.length; i++){
        if (requests[i].status == "Pending"){
            emp = true;
            break;
        }
    }
    return emp
}