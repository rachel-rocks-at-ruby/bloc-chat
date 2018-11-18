import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ''
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

    render() {
        return (
        <div className = "Room-list">
        <h3>Room List </h3>
        {this.state.rooms.map( room => <ul key={ room.key } > { room.name }  </ul> )}
        </div>
        );
    };
}
    
export default RoomList;
