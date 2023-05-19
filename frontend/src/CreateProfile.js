import './CreateProfile.css'
export default function CreateProfile({onSubmit}){

    async function submit(e){
        let username = document.querySelector('.username').value
        let password = document.querySelector('.password').value
        console.log({
            "username": username,
            "password": password,
        })
        e.preventDefault();
        await fetch("/api/register/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                "user": username,
                "password": password,
                "pType": "Customer" //We want to make sure when a user creates an account, they are always a customer
            })
        }).then(function(res){
            fetch('/api/login/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie("csrftoken")
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                })
            }).then(function(res){
                onSubmit()
                window.location.replace('/groups')
            })
        }
        )
    }

    return(
        <div className="CreateProfile">
            <label>Username: </label>
            <input type="text" className="username"/>
            <label>Password: </label>
            <input type="password" className='password'/>
            <div></div>
            <br/><br/><br/>
            <div></div>
            <input type="button" className='submit' value="Create Profile" onClick={submit} />
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