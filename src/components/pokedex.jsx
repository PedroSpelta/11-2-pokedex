import Pokemon from '../components/pokemon';
import { useEffect, useState } from 'react';

function Pokedex({ showModal, setActualPokemon }) {
  // const [pokeList, setPokeList] = useState([]);
  // const [audio] = useState(new Audio('/backgroundmsc.mp3'))
  // useEffect(() => {
  //   // audio.play();
  // });
  const [pList, setPList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [ran, setRan] = useState(false);
  const [pokeReady, setPokeReady] = useState(false);
  useEffect(() => {
    console.log('0');
    if (!ran) {
      console.log('1');
      fetch('https://pokeapi.co/api/v2/pokedex/7/')
        .then((res) => res.json())
        .then((json) => {
          setPList(json.pokemon_entries);
          setRan(true);
        });
    }
    if (ran && !pokeReady) {
      console.log('2');
      setPokeReady(true);
      pList.forEach((poke) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke.pokemon_species.name}`)
          .then((res) => res.json())
          .then((json) => {
            const list = pokemonList;
            const gif =
              json.sprites.versions['generation-v']['black-white'].animated
                .front_default;
            const type2 =
              json.types[1] !== undefined ? json.types[1].type.name : null;
            const ability2 =
              json.abilities[1] !== undefined
                ? json.abilities[1].ability.name
                : null;
            list.push({
              index: poke.entry_number,
              name: json.name,
              id: json.id,
              sprite: gif,
              type: json.types[0].type.name,
              type2: type2,
              weight: json.weight / 10,
              height: json.height / 10,
              ability1: json.abilities[0].ability.name,
              ability2: ability2,
              hp: json.stats[0].base_stat,
              atk: json.stats[1].base_stat,
              def: json.stats[2].base_stat,
              spatk: json.stats[3].base_stat,
              spdef: json.stats[4].base_stat,
              speed: json.stats[5].base_stat,
            });
            setPokemonList(list);
          });
      });
    }
  });
  return (
    pokemonList.map((pokemon) => (
      <div key={pokemon.index}>
        <p>ab</p>
        <Pokemon
          setActualPokemon={setActualPokemon}
          showModal={showModal}
          pokeInfo={pokemon}
        />
      </div>
    ))
  )
}

export default Pokedex;
