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

var navcur = "home";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar cur = {navcur}/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/contactUs" element={<ContactUs/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/createProfile" element={<CreateProfile/>}/>
          <Route path="/groups" element={<GroupList/>} />
          <Route path="/group/:groupId" element={<CreateGroup/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
