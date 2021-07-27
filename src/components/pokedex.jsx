
import pokemons from '../data';
import Pokemon from '../components/pokemon'
import { useEffect, useState } from 'react';

function Pokedex({ showModal, setActualPokemon }) {
  // const [pokeList, setPokeList] = useState([]);
  // const [audio] = useState(new Audio('/backgroundmsc.mp3'))
  // useEffect(() => {
  //   // audio.play();
  // });
  const [pList, setPList] = useState([]);
  const [ran, setRan] = useState(false);
  useEffect(() => {
    if(!ran) {
      setRan(true);
      fetch('https://pokeapi.co/api/v2/pokedex/7/')
      .then((res) => res.json())
      .then((json) => {
        setPList(json.pokemon_entries)
      })
    } 
  })
  return pList.map((pokemon) => (
    <div key={pokemon.pokemon_species.name}>
      <Pokemon
        setActualPokemon={setActualPokemon}
        showModal={showModal}
        name={pokemon.pokemon_species.name}
      />
    </div>
  ));
}

export default Pokedex;