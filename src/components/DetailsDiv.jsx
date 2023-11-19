import details from "../assets/details.json"

const DetailsDiv = (props) =>{

    const types = details[0]
    const colors = details[1]
    const icons = details[2]
    const colors2 = details[3]


    const {thisPokemon,waitMain, update, setUpdate} = props;
    console.log(thisPokemon)

    const handleFav = (x) =>{
        x.favourite = !x.favourite
        setUpdate(!update)
      }
    

    return (
        <div className="left-side-div">
            {waitMain?(<h1>Details</h1>):
                Object.keys(thisPokemon).length === 0 ? (<h1>Pick a Pokemon</h1>):
                <div>
                <h1>{thisPokemon.name.toUpperCase()}</h1>
                <img className="pokemon-details-image"
                  src={thisPokemon.sprites.other.home.front_default}
                  style={{ backgroundColor: colors[types.indexOf(thisPokemon.types[0].type.name)],
                        borderColor: colors2[types.indexOf(thisPokemon.types[0].type.name)]
                        }}
                  alt={thisPokemon.name}
                />
                <div className="pokemon-detail-div">
                    <div>
                        <p>ID: {thisPokemon.id}</p>
                        {thisPokemon.types.length === 1?
                        (<div className='pokemon-types-icons'>
                            <p>Types:</p>
                        <img className="type-icon" src={icons[types.indexOf((thisPokemon.types[0].type.name))]}/>
                        </div>
                        ):(
                        <div className='pokemon-types-icons'>
                            <p>Types: </p>
                            <img className="type-icon" src={icons[types.indexOf((thisPokemon.types[0].type.name))]}/>
                            <img className="type-icon" src={icons[types.indexOf((thisPokemon.types[1].type.name))]}/>
                        </div>
                        )}
                        <p>Weight: {thisPokemon.weight}</p>
                    </div>
                    <img onClick={() =>handleFav(thisPokemon)} className="favIcon3" src={thisPokemon.favourite? '/favoYes.png' : '/favoNo.png'}/>
                    <div>
                        <p>Attack: {thisPokemon.stats[1].base_stat} </p>
                        <p>Defense:{thisPokemon.stats[2].base_stat} </p>
                        <p>HP:{thisPokemon.stats[0].base_stat} </p>
                    </div>
                </div>
              </div>
            }
        </div>
      );
      
}

export default DetailsDiv