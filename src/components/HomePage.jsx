import { useEffect, useState } from 'react'
import axios from 'axios'
import AllPokemonsDiv from './AllPokemonsDiv'
import DetailsDiv from './DetailsDiv'
import { Navigate, useNavigate } from 'react-router-dom'

function HomePage(props) {

  const API_URL="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649"

const   {myPokemons, setMyPokemons} = props;
  const [waitMain, setWaitMain] = useState(true)
  const [allPokemonList, setAllPokemonList] = useState([])
  const [thisPokemon,setThisPokemon] = useState({})
  const [update,setUpdate] = useState(true)
  const navigate = useNavigate()

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
    <div style={{height: "fit-content", margin: "auto"}}>
    <p>{myPokemons.length}/6</p>
    <button onClick={() =>navigate("/battle")} style={{height: "10vh", width: "5vw", fontSize: "4em"}}>GO!</button>
    </div>
    <AllPokemonsDiv allPokemonList={allPokemonList} waitMain={waitMain} setThisPokemon={setThisPokemon} update={update} setUpdate={setUpdate}
    myPokemons={myPokemons} setMyPokemons={setMyPokemons}/>
    </div>
  );
  
}

export default HomePage
