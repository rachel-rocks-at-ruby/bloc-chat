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
      <body>
        <header>
          Bloc Chat
          < User firebase = {firebase} user = {this.state.user} setUser = {this.setUser.bind(this)} />
        </header>
     
        <nav classname = "rooms">
          < RoomList firebase = { firebase } setActiveRoom = {this.setActiveRoom.bind(this)} />
        </nav>

        <article className = "messages"> 
          {this.state.activeRoom !== "" ? < MessageList  firebase = {firebase} activeRoom = {this.state.activeRoom}
            user = {this.state.user} />: <div> Select a chatroom from the left nav to see chat history </div> }
        </article>
    </body>
    );
  };
};

export default App;