import './Login.css'

export default function Login({onSubmit}){

    async function submit(e){
        let username = document.querySelector('.username').value
        let password = document.querySelector('.password').value
        await fetch('/api/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
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
            <a href="/CreateProfile">Create a Profile</a>
            <input type="button" value="login" onClick={submit}/>
        </div>
    )
}