import React from 'react'

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = []

    for (let i=1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className= 'pagination'>
            <label>Pages:</label>
            { pageNumbers &&
                pageNumbers.map(number => (
                    <button key='pbutton' onClick={()=>paginado(number)} className='number'>{number}</button>
                ))
            }
        </div>
    )
}