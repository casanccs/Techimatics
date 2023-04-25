import './Login.css'

export default function Login({onSubmit}){

    async function submit(e){
        let username = document.querySelector('.username').value
        let password = document.querySelector('.password').value
        await fetch('/api/login/', {
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
        })
    }

    return(
        <div className="Login">
            <label>Username: </label>
            <input type="text" className="username" />
            <label>Password: </label>
            <input type="password" className='password' />
            <div></div>
            <br/><br/><br/>
            <a href="/createProfile">Create a Profile</a>
            <input type="button" value="login" onClick={submit}/>
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