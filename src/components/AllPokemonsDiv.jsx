import { useEffect, useState } from "react";
import details from "../assets/details.json"
const AllPokemonsDiv = (props) =>{

  const {allPokemonList, waitMain, setThisPokemon, update,setUpdate} = props;
  const [displayList,setDisplayList] = useState()
  const [favourites, setFavourites] = useState(false)

  
  const types = details[0]
  const colors = details[1]
  const icons = details[2]
  const colors2 = details[3]

  useEffect(()=>{
    setDisplayList(allPokemonList)
  },[waitMain])

  const handleFav = (x) =>{
    x.favourite = !x.favourite
    setUpdate(!update)
  }

  const handleSearch = (x) => {
    const parsedX = parseInt(x);
  
    isNaN(parsedX)
      ? setDisplayList(
          allPokemonList.filter((pokemon) => pokemon.name.includes(x))
        )
      : setDisplayList(
          allPokemonList.filter((pokemon) => pokemon.id === parsedX)
        );
  };

  const toggleFav = () => {
    setFavourites (!favourites);

    !favourites?
    setDisplayList(
      allPokemonList.filter((pokemon)=>{
        return pokemon.favourite
      })
    )
    :
    setDisplayList(allPokemonList)
  }

  const handleChange = (x) => {
    setFavourites(false)
    x==="all"?setDisplayList(allPokemonList):
    setDisplayList(
      allPokemonList.filter((pokemon)=>{
        return pokemon.types[0].type.name === x;
      })
    )
  }

  const cardHover = (x) => {
    setThisPokemon(x)
  }

  

return (
    <div id='right-side-div'>
      {waitMain ? (
        <h1>Loading...</h1>
      ) : (
        <div>
            <div id="filters">
            <input className="input" type="text" placeholder="name/id..." onChange={(e) => handleSearch(e.target.value)}></input>
            <select className="input" onChange={(e) => handleChange(e.target.value)}>
              <option value="all">Any Type</option>
              <option value="normal">Normal</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="electric">Electric</option>
              <option value="grass">Grass</option>
              <option value="ice">Ice</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="flying">Flying</option>
              <option value="psychic">Psychic</option>
              <option value="bug">Bug</option>
              <option value="rock">Rock</option>
              <option value="ghost">Ghost</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="steel">Steel</option>
              <option value="fairy">Fairy</option>
            </select>
            <img onClick={() => toggleFav()}className="favIcon2" src={favourites? '/favoYes.png' : '/favoNo.png'}/>
            </div>
            <div id='all-pokemon-list'>
            {displayList.map((pokemon)=>{
              return (
                  <div
                    id={`${pokemon.id}-div`} className="pokemon-card" onMouseEnter={() => {cardHover(pokemon)}}>
                  <img className="pokemon-list-image" src={pokemon.sprites?.versions['generation-vii']?.['ultra-sun-ultra-moon']?.front_default} alt={pokemon.name}/>
                  <img onClick={() =>handleFav(pokemon)} className="favIcon" src={pokemon.favourite? '/favoYes.png' : '/favoNo.png'}/>
              </div>)
            })
            }       
              </div>
          </div>
        )}
    </div>
  );
}

export default AllPokemonsDiv;