import React from 'react'

export default function Card ({name, types, sprite}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src={sprite} alt='img not found' width='100px' height='100px'/>
        </div>
    );
};