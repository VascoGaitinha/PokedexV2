import { useEffect, useState } from 'react'
import './App.css'
import axios, { all } from 'axios'
import AllPokemonsDiv from './components/AllPokemonsDiv'
import DetailsDiv from './components/DetailsDiv'

function App() {

  const API_URL="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649"

  const [waitMain, setWaitMain] = useState(true)
  const [allPokemonList, setAllPokemonList] = useState([])
  const [thisPokemon,setThisPokemon] = useState({})
  const [update,setUpdate] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainResponse = await axios.get(API_URL);
        const pokemonPromises = mainResponse.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const pokemonData = pokemonResponse.data
          pokemonData.favorite = false;

          return pokemonData;
        });

        const resolvedPokemons = await Promise.all(pokemonPromises);
        setAllPokemonList(resolvedPokemons);
        setWaitMain(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div id="main-div">
    <DetailsDiv thisPokemon={thisPokemon} waitMain={waitMain} update={update} setUpdate={setUpdate}/>
    <AllPokemonsDiv allPokemonList={allPokemonList} waitMain={waitMain} setThisPokemon={setThisPokemon} update={update} setUpdate={setUpdate}/>
    </div>
  );
  
}

export default App
