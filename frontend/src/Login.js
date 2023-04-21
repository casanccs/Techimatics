import './Login.css'
export default function Login(){
    return(
        <div className="Login">
            <label>Username: </label>
            <input type="text" />
            <label>Password: </label>
            <input type="password" />
            <div></div>
            <br/><br/><br/>
            <a href="/CreateProfile">Create a Profile</a>
            <input type="button" value="login" />
        </div>
    )
}