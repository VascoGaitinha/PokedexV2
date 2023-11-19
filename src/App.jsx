import { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import BattlePage from './components/BattlePage'

function App() {

  const API_URL="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=649"

  const [waitMain, setWaitMain] = useState(true)
  const [allPokemonList, setAllPokemonList] = useState([])
  const [thisPokemon,setThisPokemon] = useState({})
  const [update,setUpdate] = useState(true)
  const [myPokemons, setMyPokemons] = useState([])
  return (
    <Routes>
      <Route path="/" element={<HomePage 
      myPokemons={myPokemons} setMyPokemons={setMyPokemons}/>}/>
      <Route path="/battle" element={<BattlePage myPokemons={myPokemons} allPokemonList={allPokemonList} setAllPokemonList={setAllPokemonList}
      API_URL={API_URL} waitMain={waitMain} setWaitMain={setWaitMain}/>}/>
    </Routes>
  )
  
}

export default App
