import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';

export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id)); //para acceder al ID de ese detalle
    },[dispatch, id])

    const myPokemon = useSelector((state) => state.detail)

    return (
        <div>
            {
                myPokemon <= 0 ?
                <div>
                    <h1>{myPokemon[0].name}</h1>
                    <img src= {myPokemon[0].sprite} alt='' width= '300px' height= '350px'/>
                    <h3>Types: {myPokemon[0].types.map(e => e.name + (' '))}</h3>
                    <h4>Id: {myPokemon[0].id}</h4>
                    <h4>Hp: {myPokemon[0].hp}</h4>
                    <h4>Attack: {myPokemon[0].attack}</h4>
                    <h4>Defense: {myPokemon[0].defense}</h4>
                    <h4>Speed: {myPokemon[0].speed}</h4>
                    <h4>Height: {myPokemon[0].height}</h4>
                    <h4>Weight: {myPokemon[0].weight}</h4>
                </div> : <p>Loading...</p>    
            }
            <Link to= '/home' >
                <button>Return</button>
            </Link>
        </div>
    )
}