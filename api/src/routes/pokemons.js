const axios = require ('axios');
const { Router } = require('express');
const router = Router();
const { Pokemon, Type } = require('../db');

//uso async/await para q espere respuesta
// Esta funcion me trae los datos de los pokemons de la api.
const getPokemonsApi = async () => {
    const pokemonsPrimero = await axios.get("https://pokeapi.co/api/v2/pokemon") // Aca me traigo los primeros 20 pokemons de la api.
    const pokemonSegundo = await axios.get(pokemonsPrimero.data.next) // Aca me traigo los siguientes 20 pokemons.
    const totalPokemons = pokemonsPrimero.data.results.concat(pokemonSegundo.data.results) // Me guardo los 40 pokemons en una variable.

    try {
        const infoUrl = totalPokemons.map(e => axios.get(e.url)) // Accedo a la url con la info de cada pokemon.
        let infoPokemons = Promise.all(infoUrl) // Le paso un arreglo de promesas con la respuesta de cada url(info).
            .then(e => {
                let pokemon = e.map(e => e.data) // Accedo a la info de cada url de cada pokemon.
                let info = [] // Genero un arreglo de objetos con la info que necesito de cada pokemon.
                pokemon.map(e => {
                    info.push({
                        id: e.id,
                        name: e.name,
                        hp: e.stats[0].base_stat,
                        attack: e.stats[1].base_stat,
                        defense: e.stats[2].base_stat,
                        speed: e.stats[5].base_stat,
                        height: e.height,
                        weight: e.weight,
                        sprite: e.sprites.front_default,
                        types: e.types.length < 2 ? [{name: e.types[0].type.name}] : [{name: e.types[0].type.name}, {name: e.types[1].type.name}]
                    })
                })
                return info;
            })
            return infoPokemons;
    } catch (error) {
        console.log(error)
    }
}

//Esta funcion me trae la info de la db
const getPokemonsDb = async () => {
    try {
        return await Pokemon.findAll({
            include: {
                model: Type, // para q haga la relación y me traiga los tipos tb
                attributes: ['name'], // me traigo el nombre del tipo, el id viene solo
                through: {
                    attributes: [] // a traves de esta tabla
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// Esta funcion concatena los datos de los pokemons de la api con los de la db.
const getAllPokemons = async () => {
    const apiInfo = await getPokemonsApi();
    const dbInfo = await getPokemonsDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

// GET /pokemons y GET /pokemons?name='...'

router.get('/', async (req, res, next) => {
    const {name} = req.query;
    try {
        const pokemonsTotal = await getAllPokemons();
        if(name) { // si me pasan el nombre 
            let pokemonName = await pokemonsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            return pokemonName.length ? //hay algo?
            res.status(200).send(pokemonName) :
            res.status(404).send('Pokemon not found')
        } else { // sino devolveme todo
            return res.status(200).send(pokemonsTotal);
        }
    } catch (err) {
        return next(err);
    }
});

// POST /pokemons
router.post('/', async (req, res, next) => {
    const {name, hp, attack, defense, speed, height, weight, sprite, createdInDb, types} = req.body;
    try {
        const createdPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
            createdInDb
        }); // no le paso los tipos pq tengo q hacer la relacion aparte, la hago abajo
        const createdDb = await Type.findAll({
            where: {name: types}
        });
        createdPokemon.addType(createdDb);
        return res.status(200).send('Pokemon successfully created')
    } catch (err) {
        next(err)    
    }
})

//GET /pokemons/{idPokemon}
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const allPokemons = await getAllPokemons();
    if(id) {
        const pokemonId = await allPokemons.filter(e => e.id == id);
        pokemonId.length ?
        res.status(200).json(pokemonId) :
        res.status(404).send('Pokemon not found')
    }
})


module.exports = router;