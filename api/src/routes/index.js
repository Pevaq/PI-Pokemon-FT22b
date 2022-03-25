const { Router } = require('express');
// Importar todos los routers;
const pokemons = require('./pokemons');
const types = require('./types'); 

const router = Router();

// Configurar los routers
router.use('/pokemons', pokemons);
router.use('/types', types); 

module.exports = router;