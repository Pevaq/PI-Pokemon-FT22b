import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, filterPokemonsByType, filterCreated, orderByName, orderByAttack } from '../actions/index';
import {Link} from 'react-router-dom';
import Card from './card';
import Paginado from './paginado'
import SearchBar from './searchBar';


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons); //lo mismo que hacer mapstatetoprops
    const [orden, setOrden] = useState('')
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1); //pq siempre arranco en la primer página
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 9
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    //me devuelve un arreglo desde el 0 hasta el 9

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect (() => {
        dispatch(getPokemons()) //lo mismo q hacer map dispatch to props
    },[dispatch])

    function handleClick(e){ // por si se buggea
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterType(e){
        dispatch(filterPokemonsByType(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrder(`Orderado ${e.target.value}`)
    }

    return (
        <div>
            <Link to= '/pokemon'> Create your own pokémon </Link>
            <h1>The most complete Pokédex</h1>
            <button onClick={e => {handleClick(e)}}> 
                Refresh
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value= 'asc'> Name / A-Z </option> {/* el value me permite acceder y preguntar después si es ascendente o descendente dentro del select */}
                    <option value= 'desc'> Name / Z-A </option>
                </select>
                <select onChange={e => handleSortAttack(e)}>
                    <option value='stronger'> Stronger/Weaker </option>
                    <option value='weaker'> Weaker/Stronger </option>
                </select>
                <select onChange={e => handleFilterType(e)}>
                    <option value= 'All'> All </option>
                    <option value= 'normal'> Normal </option>
                    <option value= 'fighting'> Fighting </option>
                    <option value= 'flying'> Flying </option>
                    <option value= 'poison'> Poison </option>
                    <option value= 'ground'> Ground </option>
                    <option value= 'rock'> Rock </option>
                    <option value= 'bug'> Bug </option>
                    <option value= 'ghost'> Ghost </option>
                    <option value= 'steel'> Steel </option>
                    <option value= 'fire'> Fire </option>
                    <option value= 'water'> Water </option>
                    <option value= 'grass'> Grass </option>
                    <option value= 'electric'> Electric </option>
                    <option value= 'psychic'> Psychic </option>
                    <option value= 'ice'> Ice </option>
                    <option value= 'dragon'> Dragon </option>
                    <option value= 'dark'> Dark </option>
                    <option value= 'fairy'> Fairy </option>
                    <option value= 'unknown'> Unknown </option>
                    <option value= 'shadow'> Shadow </option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value= 'All'> All </option>
                    <option value= 'created'> Created </option>
                    <option value= 'api'> Existing </option>
                </select>
                <Paginado
                pokemonsPerPage = {pokemonsPerPage}
                allPokemons = {allPokemons.length}
                paginado = {paginado}
                />
                <SearchBar></SearchBar>
                {currentPokemons?.map((c) => {
                    return (
                        <div>
                            <Link to = {'/details/' + c.id}>
                                <Card name={c.name} sprite={c.sprite} type={c.types} key={c.id}/>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
     )

}