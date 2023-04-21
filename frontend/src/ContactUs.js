import './ContactUs.css'
import myself from './assets/AboutMe.png'
export default function ContactUs(){
    return(
        <div className="ContactUs">
            <img src={myself}/>
            <h1>email: techimatics@gmail.com</h1>
            <h1>Phone number: 1-346-391-7496</h1>
            <h1>Based in Houston, primarily in the south east area</h1>
        </div>
    )
}