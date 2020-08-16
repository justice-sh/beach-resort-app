import React, { Component } from 'react'
import items from './data';
import client from './contentful';

const RoomContext = React.createContext();


class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    getData = async () => {
        try {
            // Retrieve data
            const response = await client.getEntries({
                content_type: 'beachResort',
                order: 'fields.price'
            });

            // Format data
            const rooms = this.formateData(response.items);
            const featuredRooms = rooms.filter(room => room.featured);
            const maxPrice = Math.max(...rooms.map(item => item.price));
            const maxSize = Math.max(...rooms.map(item => item.size));

            // Set state.
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        // Get data
        this.getData();
    }

    formateData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields, id, images};
            return room;
        });

        return tempItems;
    }

    getRoom = slug => {
        const tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value // sets the matching property returned from target.name;
        }, this.filterRooms);
        
    };

    filterRooms = () => {
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;
        let tempRooms = [...rooms];

        // Transform values
        capacity = parseInt(capacity);
        price = parseInt(price);

        // Filter by type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        
        // Filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity === capacity);
        }

        // Filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // Filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        // Filter by extras
        if (pets) tempRooms = tempRooms.filter(room => room.pets === true);
        if (breakfast) tempRooms = tempRooms.filter(room => room.breakfast === true);

        // Change state.
        this.setState({
            sortedRooms: tempRooms
        });
    };

    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomContext, RoomConsumer};

// Method 2 of using Consumer.
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}