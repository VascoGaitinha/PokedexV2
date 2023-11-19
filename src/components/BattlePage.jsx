import { all } from "axios"
import { useEffect } from "react";
import axios from "axios";

const BattlePage = (props) =>{
    const {myPokemons, allPokemonList, setAllPokemonList,API_URL, waitMain, setWaitMain} = props
    let randIndex = []

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

    const randGenerator = () =>{
        randIndex = []
        for( let i = 0; i<6; i++){
            randIndex.push(Math.floor(Math.random() * 649) + 1)
        }

        randIndex.map((index) =>{
            console.log(allPokemonList[index])
        })

    }
    randGenerator()


    return(
        <div>
            {waitMain? <h1>Loading..</h1>:
            <div>
            <h1>Battle</h1>
                <div className="teams-div">
                    <div>
                    {myPokemons.map((pokemon) =>{
                        return(
                            <div>
                            <img src={pokemon.sprites.front_default}/>
                            </div>
                        )}
                    )}
                </div>
                <div>
                    {randIndex.map((index)=>{
                        return(
                            <div>
                                <img src={allPokemonList[index].sprites.front_default}/>
                            </div> 
                        )
                    })}
                    </div>
                </div>
            </div>}
        </div>
    )

}

export default BattlePage