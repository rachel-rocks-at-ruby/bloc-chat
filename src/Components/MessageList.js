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

        formatTimeStamp(milliseconds) {
            let d = new Date(milliseconds);
            let hour = d.getHours();
                 let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
                 let time = (hour % 12) + ':' + min;
                 return time;
        };
        
        
    render () {

        return (
            <section>
                <div>
                    <h3>{this.props.activeRoom.name}</h3>
                        <ul>
                            {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map( (message, index) =>
                            <div key = {index} >
                                <ul><b>{message.username}:</b> {message.content}</ul> 
                                <ul>{this.formatTimeStamp(message.sentAt)}</ul>
                            </div>
                            )}
                        </ul>

                    <form
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
