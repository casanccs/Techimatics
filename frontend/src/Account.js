import './Account.css'
import React, { useState, useEffect } from 'react'


export default function Account({profile}){

    let amount = 0.50

    async function checkout(){
        let response = await fetch('/api/charge/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                'amount': amount,
            })
        })
        let data = await response.json()
        window.location.replace(data['url'])
    }

    if (profile){
        return(
            <div className='account'>
                <script src="https://js.stripe.com" className="stripe-button"
                data-description="Payment Gateway" data-amount={amount} data-locale="auto"
                ></script>
                <h1>Account: {profile['profile']['user']}</h1>
                <h2>You have: ${profile['profile']['tickets']}</h2>
                <button type="submit" id="checkout-button" onClick={checkout}>Checkout</button>
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