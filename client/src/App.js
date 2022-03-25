import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Home from './components/home'
import PokemonCreate from './components/pokemonCreate'
import Detail from './components/detail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = '/' element= {<LandingPage/>}/>
        <Route path = '/home' element= {<Home/>}/>
        <Route path = '/pokemon' element = {<PokemonCreate/>}/>
        <Route path = '/details/:id' element = {<Detail/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
