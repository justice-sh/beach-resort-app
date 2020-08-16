import React from 'react'
import {Link} from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';
import PropTypes from 'prop-types';

export default function Room({room}) {
    const {name, slug, price, images} = room;

    return (
        <article className='room'>
            <div className='img-container'>
                <img src={images[0] || defaultImg} alt={slug} />
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>per price</p>
                </div>
                <Link to={`/rooms/${slug}`} className='btn-primary room-link'>Features</Link>
                <p className='room-info'>{name}</p>
            </div>
        </article>
    )
}

Room.propTypes = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    })
};
