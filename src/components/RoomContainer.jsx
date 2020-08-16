import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import {withRoomConsumer} from '../context';
import Loading from './Loading';

// Method 1 of using Consumer.
// function RoomContainer() {
    
    // return (
        // <RoomConsumer>
        //     { value => {
        //         const {loading, sortedRooms, rooms} = value;

        //         if (loading) return <Loading />

        //         return (
        //             <div>
        //                 Hello from room container
        //                 <RoomFilter rooms={rooms} />
        //                 <RoomList rooms={sortedRooms} />
        //             </div>
        //         )
        //     }}
        // </RoomConsumer>
    // )
// }

// Method 2 of using Consumer.
function RoomContainer({context}) {
    const {loading, sortedRooms, rooms} = context;

    if (loading) return <Loading />

    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    )
}

export default withRoomConsumer(RoomContainer);
// export default RoomContainer
