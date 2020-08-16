import React from 'react'
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';

// Get all unique values
const getUnique = (items, value) => [...new Set(items.map(item => item[value]))];

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context;
    
    // Gt unique types and add 'all'
    const types = ['all', ...getUnique(rooms, 'type')];
    const people = getUnique(rooms, 'capacity').sort((a, b) => a - b);

    return (
        <section className='filter-container'>
            <Title title='search rooms' />
            <form className='filter-form'>
                {/*Select type*/}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className='form-control' onChange={handleChange}>
                        {types.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                {/*End of select type*/}
                {/* Guest */}
                <div className="form-group">
                    <label htmlFor="capacity">room capacity</label>
                    <select name="capacity" id="capacity" value={capacity} className='form-control' onChange={handleChange}>
                        {people.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                {/* End of guest */}
                {/* Room price */}
                <div className="form-group">
                    <label htmlFor="capacity">room price ${price}</label>
                    <input type='range' name="price" id="price" value={price} className='form-control' 
                        onChange={handleChange} min={minPrice} max={maxPrice} />
                </div>
                {/* End of room price */}
                {/* Size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" min="0" id="size" value={minSize} onChange={handleChange}className='size-input'/>
                        <input type="number" name="maxSize" id="size" value={maxSize}  onChange={handleChange} 
                            className='size-input'/>
                    </div>
                </div>
                {/* End of size */}
                {/* Extras */}
                <div className="form-g">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* End of extras */}
            </form>
        </section>
    )
}
