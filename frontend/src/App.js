import './App.css';
import './assets/Gamer.ttf';
import Navbar from './Navbar'
import Home from './home'
import {Routes, Route} from 'react-router-dom'
import ContactUs from './ContactUs'
import Login from './Login'
import CreateProfile from './CreateProfile'
import GroupList from './GroupList'
import CreateGroup from './CreateGroup'
import Account from './Account'
import {useState, useEffect} from 'react'
import CSRFToken from './csrftoken';
import Success from './Success'

var navcur = "home";
function App() {

  const [currentUser, setCurrentUser] = useState()
  const [profile, setProfile] = useState()
  console.log(getCookie("csrftoken"))
  useEffect(() => {
    fetch('/api/profile/', {
      method: "GET",
      headers: {
        'X-CSRFToken': getCookie("csrftoken")
      }
    }).then(function(response){
      console.log(response.status)
      if (response.status === 403) throw new Error('403 is bad!')
      console.log('Core user set true')
      setCurrentUser(true)
      return response.json()
    }).then((data) => {
      setProfile(data)
    }).catch(function(error){
      console.log('Core user set false')
      setCurrentUser(false)
    })
  }, [])

  if (currentUser){
    console.log("Profile from app: ", profile)
    return (
      <div className="App">
        <header className="App-header">
          <CSRFToken />
          <Navbar cur = {navcur} stat = {currentUser} profile={profile} onSubmit2={() => setCurrentUser(false)}/>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/contactUs" element={<ContactUs/>}/>
            <Route path="/groups" element={<GroupList profile={profile}/>}/>
            <Route path="/group/:groupId" element={<CreateGroup profile={profile}/>} />
            <Route path="/account" element={<Account profile={profile} />}/>
            <Route path="/success" />
          </Routes>
        </header>
      </div>
    );
  }
  return (
    <div className="App">
      <CSRFToken />
      <Navbar cur = {navcur} stat = {currentUser} profile={profile}/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/contactUs" element={<ContactUs/>}/>
          <Route path="/login" element={<Login onSubmit={() => setCurrentUser(true)} />} />
          <Route path="/createProfile" element={<CreateProfile onSubmit={() => setCurrentUser(true)}/>} />
          <Route path="/groups" element={<GroupList profile={profile} />}/>
          <Route path="/account" element={<Account profile={profile} />}/>
          <Route path="/success" />
        </Routes>
    </div>
  ) 
}

export default App;


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