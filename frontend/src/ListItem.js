import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItem({group}) {
    return (
        <Link to={`/group/${group.id}`}>
            <div className="ListItem">
                <h3>{group.day}</h3>
                <h4>{group.startTime} - {group.endTime}</h4>
                <p>{group.level}</p>
                <p>By: {group.owner}</p>
                <p># of people: {group.num}</p>
            </div>   
        </Link>
    )
}