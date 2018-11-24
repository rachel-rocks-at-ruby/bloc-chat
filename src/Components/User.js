import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
    }

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
            
            <h4 className = "User"> {this.props.user ? this.props.user.displayName : 'Guest'} </h4>

            <button className = "Sign-In"
            onClick = {this.signIn.bind(this)} > Sign In </button>
            
            <button className = "Sign-Out"
            onClick = {this.signOut.bind(this)} > Sign Out </button>

            </div>
        )
    }
};

export default User;