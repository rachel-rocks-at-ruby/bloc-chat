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
            newMessage: "",
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


        handleChange(e) {
            this.setState({ newMessage: e.target.value });
        };

        handleSubmit(e) {
            e.preventDefault();
            this.setState({ newMessage: e.target.value });
        };

        createMessage(e){
            this.messagesRef.push({
                username: this.props.user ? this.props.user.displayName: "Guest",
                content: this.state.newMessage,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                roomId: this.props.activeRoom.key,
            }); 
            this.setState({ newMessage: '' });     
        };
        
    render () {

        return (
            <section>
                <div className = "Active-Room">
                    <h3>{this.props.activeRoom.key}</h3>
                        <ul className = "Display-Message">
                            {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map( (message, index) =>
                            <div key = {index} >
                                <ul><b>{message.username}:</b> {message.content}</ul> 
                                <ul className = "SentAt">{message.sentAt}</ul>
                                <br></br>
                            </div>
                            )}
                        </ul>

                    <form id = "Create-new-message" 
                        onSubmit = { (e) => this.createMessage(this.handleSubmit(e)) }>
                        <input type = "text" value = { this.state.newMessage }
                        placeholder = "Type to chat"
                        onChange = { (e) => this.handleChange(e) }/>
                        <input type= "submit" value = "Submit" />
                    </form>

                </div>		        
            </section>		 
        )		 
    };
}

export default MessageList; 
