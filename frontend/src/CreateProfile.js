import './CreateProfile.css'
export default function CreateProfile(){
    return(
        <div className="CreateProfile">
            <label>Username: </label>
            <input type="text" />
            <label>Password: </label>
            <input type="password" className='firstPassword' />
            <label>Retype Password: </label>
            <input type="password" className='secondPassword' />
            <div></div>
            <br/><br/><br/>
            <div></div>
            <input type="button" value="Create Profile" />
        </div>
    )
}