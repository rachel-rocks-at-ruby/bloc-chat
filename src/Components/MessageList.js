import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: "",
            content: "",
            roomId: "",
            sentAt: "",
        };    
        this.messagesRef = this.props.firebase.database().ref('messages');
    };

        componentDidMount() {
            this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
                message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) });
            });
        };
    
    render () {
        return (
            <section>
                <div className = "Messages">
                    <h3>Messages Go Here</h3>
                        <ul className = "Display-Message">
                            {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map( (message, index) =>
                            <div key = {index} >
                                <ul>{message.username}</ul>
                                <ul>{message.content}</ul>
                                <ul>{message.sentAt}</ul>
                                <ul>{message.roomId}</ul>
                            </div>
                            )}
                        </ul>
                </div>		        
            </section>		 
        )		 
    };
}

export default MessageList; 
