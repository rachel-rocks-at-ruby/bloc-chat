import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super();
    };

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    };

    signOut() {
        this.props.firebase.auth().signOut();
    };

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    };


    render() {       
        return (
            <div>
            {this.props.user ? "Welcome, " + this.props.user.displayName : "Welcome, Guest"}
           { this.props.user !== null ? 
           <button onClick = {this.signOut.bind(this)} > Sign Out </button>
            :
            <button
            onClick = {this.signIn.bind(this)} > Sign In </button>
           }
           </div>
        )
    }
};

export default User;