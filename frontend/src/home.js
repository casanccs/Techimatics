import './home.css'
import ships from './assets/Spaceship.png'
import player from './assets/Player.png'
import images from './assets/planCreatePlay.png'
import me from './assets/Me.png'
import logos from './assets/bunchOfLogos.png'
import code from './assets/code.png'
import game from './assets/zombieGame.png'
import gimp from './assets/gimpStuff.png'
import player2 from './assets/Rando.png'
import skeleton from './assets/Skeleton.png'

export default function home(){
    return(
        <div className="home">
            <div className = "top">
                <img src={ships} className="ships" id="ship1"/>
                <img src={ships} className="ships" id="ship2"/>
                <img src={ships} className="ships" id="ship3"/>
                <img src={player} id="player"/>
                <div id="mid">
                    <h1>Hands on game development learning</h1>
                    <h2>Based in Houston, Texas!</h2>
                </div>
                <img src={player2} id="player2"/>
                <img src={skeleton} id="skeleton"/>
                <img src={images} className="images"/>
            </div>
            <div className="aboutMe">
                <img src={me} className="me"/>
                <h3>My Story</h3>
                <p>Every kid who grew up with video games dreamed of creating the next big hit. I and today's generation are no different. As a young guy who loved teaching my passion to just about anyone, I got a job as a tutor for children and made very fond memories with the bright future creators focusing on video game creation. My main goal is to educate as many people as possible, so I found a way to financially benefit everyone while giving efficient education to the students. <br></br>-Cristian Sanchez (Owner of Techimatics)</p>
            </div>
            <div className="info">
                <div className="wwtl">
                    <h1>What will they learn?</h1>
                    <p id="top">The objective of this program is to introduce coding to kids, so we start off by teaching video game programming. We plan to add other types later down the line!</p>
                    <p id="mid">Here is the path the students will take:</p>
                    <ol>
                        <li>Python (Programming Language)</li>
                        <li>Pygame (Game Library with Python)</li>
                        <li>C# (Programming Language)</li>
                        <li>Unity (Game Engine with C#)</li>
                    </ol>
                    <img src={logos}></img>
                </div>
                <div className="python">
                    <h1>Python</h1>
                    <p>They start by learning coding fundamentals:
                        <br></br>* Variables
                        <br></br>* Data types
                        <br></br>* Control Flow
                        <br></br>* Inputs
                        <br></br>* Array/Lists
                        <br></br>* Functions
                        <br></br>* Classes
                        <br></br>They make basic games in the command prompt to get the logic down. In this example, the code makes a simple calculator.
                    </p>
                    <img src={code}/>
                </div>
                <div className="pygame">
                    <h1>Pygame</h1>
                    <p>Here, the students start making games that are not text based, and will make real games. Of course, we start by teaching simple games like pong, but will move on to more complicated game types like platformers, top-down shooters, and others!</p>
                    <img src={game}/>
                </div>
                <div className="gimp">
                    <h1>Gimp</h1>
                    <p>Pixel art is a very good introduction to make eye-pleasing drawings and animations, let alone being easy! They will learn how to use this program while they learn Pygame. The drawings they make, will be put in the games they create.</p>
                    <img src={gimp}/>
                </div>
            </div>
            <div className="whatyouget">
                <h1>Starting at, <br></br> <div style={{"color": "rgb(0,210,0)", "fontSize": "4vw", "marginTop": "0.5vw"}}>$15</div> an hour,you get: </h1>
                <p>Current Features:</p>
                <ul>
                    <li>Simple notes that summarize what they learn in the class.</li>
                    <li>List of commands that are taught and describes how they work. (Otherwise known as documentation)</li>
                    <li>Weekly optional homework to get them to code outside of home, that comes with answers and explanations to self grade and study.</li>
                    <li>Projects that students will work on, and will get help from a tutor</li>
                    <li>Communication with tutor so they can answer simple questions that students or parents may have.</li>
                </ul>
                <div className="line"></div>
                <div className="right">
                    <p>Future Features:</p>
                    <ul>
                        <li>Coding competitions.</li>
                        <li>Weekly showoff of projects that students make that anyone can play.</li>
                        <li>Teaching other subjects like math, circuits, and other science based disciplines.</li>
                    </ul>
                </div>
            </div>
            <div className='pricing'>
                <h2 id="first">Pricing:</h2>
                <h3>$15 an hour for a class of 5 students</h3>
                <h3>$18 an hour for a class of 4 students</h3>
                <h3 id="last">$20 an hour for a class of 3 students</h3>
            </div>
            <div className="requirements">
                <div className="line"></div>
                <h1>Requirements</h1>
                <ul>
                    <li>Be patient and to have a huge desire to learn!</li>
                    <li>Able to use the Zoom app (If going online)</li>
                    <li>A ride to the location (If in person)</li>
                    <li>Be able to type</li>
                    <li>Must meet Unity Requirements: Unity - Manual: System requirements for Unity 2020 LTS (unity3d.com)</li>
                    <li>Windows 10+ is preferred</li>
                </ul>
            </div>
        </div>
    )
}