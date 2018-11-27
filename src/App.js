import React, { Component } from 'react';
import './App.css';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import User from './Components/User';
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAn-tJhZWppuRTFNzqygQ3mmcbko_t45xM",
    authDomain: "bloc-chat-ec024.firebaseapp.com",
    databaseURL: "https://bloc-chat-ec024.firebaseio.com",
    projectId: "bloc-chat-ec024",
    storageBucket: "bloc-chat-ec024.appspot.com",
    messagingSenderId: "908956873999"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    activeRoom: "", //or "null"?
    user: "",
  };
    this.setActiveRoom = this.setActiveRoom.bind(this);
};
  
  setActiveRoom(room) {
    this.setState({activeRoom: room});
  };

  setUser(user) {
    this.setState({user: user});
  };

  render() {
    
    return (
    
      <div className = "Container">
      
      <header> Bloc Chat </header>
        
      <div className = "User-Menu"> 
        < User firebase = {firebase} user = {this.state.user} setUser = {this.setUser.bind(this)} />
      </div>

      <div classname = "Room-Column">
        < RoomList firebase = { firebase } setActiveRoom = {this.setActiveRoom.bind(this)} />
      </div>

        <div className = "Messages"> {this.state.activeRoom !== "" ? < MessageList  firebase = {firebase} activeRoom = {this.state.activeRoom}
            user = {this.state.user} />: <div> <p><h2> No chat room selected: User welcome app instructions will go in a new, styled component here </h2></p></div> }
          
        </div>

    </div>
    
    );
  };
};

export default App;