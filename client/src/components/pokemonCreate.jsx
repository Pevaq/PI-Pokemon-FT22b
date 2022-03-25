import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postPokemon, getTypes } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Name must be completed';
    }
    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch()
    const history = useNavigate()
    const tipos = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprite: "",
        types: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleCheck(e) {
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        alert("Personaje creado")
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            sprite: "",
            types: []
        })
        history.push('/home')
    }

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div>
            <Link to= '/home'><button>Return</button></Link>
            <h1>Create your own pokémon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Hp:</label>
                    <input
                    type= "text"
                    value= {input.hp}
                    name= "hp"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                    type= "text"
                    value= {input.attack}
                    name= "attack"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                    type= "text"
                    value= {input.defense}
                    name= "defense"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                    type= "text"
                    value= {input.speed}
                    name= "speed"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                    type= "text"
                    value= {input.height}
                    name= "height"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                    type= "text"
                    value= {input.weight}
                    name= "weight"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Sprite:</label>
                    <input
                    type= "text"
                    value= {input.sprite}
                    name= "sprite"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Types:</label>
                    <select onChange={(e) => handleSelect(e)}>
                        {tipos.map((e) => (
                            <option value={e}>{e}</option>
                        ))}
                    </select>
                    <ul>
                        <li>{input.types.map(e => e + ", ")}</li>
                    </ul>        
                    <button type='submit'>Create pokemon</button>
                </div>    
            </form>
            {input.types.map(e =>
                <div className='divTypes'>
                    <p>{e}</p>
                    <button className='botonX' onClick={() => handleDelete(e)}>x</button>
                </div>      
            )}
        </div>
    )
}