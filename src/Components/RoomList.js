import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: '',
        };    
        this.roomsRef = this.props.firebase.database().ref('rooms');
        };
    
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
            room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat(room) })
        });
        };

    handleChange(e) {
        this.setState({ newRoomName: e.target.value });
    };
        
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ newRoomName: e.target.value });
    };
    
    createRoom(e) {
        this.roomsRef.push({
            name: this.state.newRoomName
        }); 
        this.setState({ newRoomName: '' });     
        };

    render() {
        
        return (
        < div className = "Room-List">
            <h3> Available Rooms </h3>
         
            {this.state.rooms.map(room => <ul className = {this.props.activeRoom === room ? "SelectedRoom" : "DefaultRoom"} 
            onClick={ () => this.props.setActiveRoom(room)} 
            key = { room.key } > {room.name}
             </ul> )}
    
        <form id = "Create-new-room" 
                 onSubmit = { (e) => this.createRoom(this.handleSubmit(e)) }>
                     <input type = "text" value = { this.state.newRoomName }
                 placeholder = "Enter a room name"
                 onChange = { (e) => this.handleChange(e) }/>
                     <input type="submit" value = "Add New" />
             </form>

            </div>
        );
    };
}
    
export default RoomList;
