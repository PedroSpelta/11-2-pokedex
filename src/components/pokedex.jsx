import Pokemon from '../components/pokemon';
import { useEffect, useState } from 'react';

function Pokedex({ showModal, setActualPokemon, selectedElement }) {
  // const [pokeList, setPokeList] = useState([]);
  // const [audio] = useState(new Audio('/backgroundmsc.mp3'))
  // useEffect(() => {
  //   // audio.play();
  // });
  const [pokemonList, setPokemonList] = useState([]);
  const [notLoaded, setNotLoaded] = useState(true)
  useEffect(() => {
    async function fetchPokemon() {
      const pokedexResponse = await fetch(
        'https://pokeapi.co/api/v2/pokedex/7/'
      );
      const pokedexData = await pokedexResponse.json();
      const list = [];
      for (let i = 0; i < pokedexData.pokemon_entries.length; i += 1) {
        const pokemonEntry = pokedexData.pokemon_entries[i];
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonEntry.pokemon_species.name}`
        );
        const pokemonData = await pokemonResponse.json();
        const gif =
          pokemonData.sprites.versions['generation-v']['black-white'].animated
            .front_default;
        const type2 =
          pokemonData.types[1] !== undefined
            ? pokemonData.types[1].type.name
            : null;
        const ability2 =
          pokemonData.abilities[1] !== undefined
            ? pokemonData.abilities[1].ability.name
            : null;
        list.push({
          index: pokemonEntry.entry_number,
          name: pokemonData.name,
          id: pokemonData.id,
          sprite: gif,
          type: pokemonData.types[0].type.name,
          type2: type2,
          weight: pokemonData.weight / 10,
          height: pokemonData.height / 10,
          ability1: pokemonData.abilities[0].ability.name,
          ability2: ability2,
          hp: pokemonData.stats[0].base_stat,
          atk: pokemonData.stats[1].base_stat,
          def: pokemonData.stats[2].base_stat,
          spatk: pokemonData.stats[3].base_stat,
          spdef: pokemonData.stats[4].base_stat,
          speed: pokemonData.stats[5].base_stat,
        });
      }
      setPokemonList(list);
      setNotLoaded(false);
    }
    fetchPokemon();
  }, []);

  if(notLoaded) return <h1>Loading</h1>

  return pokemonList.map(
    (pokemon) =>
      (selectedElement.includes(pokemon.type) || selectedElement.includes(pokemon.type2)) && (
        <div key={pokemon.index}>
          <Pokemon
            setActualPokemon={setActualPokemon}
            showModal={showModal}
            pokeInfo={pokemon}
          />
        </div>
      )
  );
}

export default Pokedex;
