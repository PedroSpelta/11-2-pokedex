import './styles.css';
import './pokemon.css';
import { useState, useEffect } from 'react';
import pokemons from './data';
import element from './elements';
import pokeball from './images/pokeball.png';

function Pokemon(props) {
  const { name } = props;
  const [pokeInfo, setPokeInfo] = useState({});
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (isActive) {
      setIsActive(false);
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => res.json())
        .then((json) => {
          const gif =
            json.sprites.versions['generation-v']['black-white'].animated
              .front_default;
              const type2 = (json.types[1] !== undefined) ? json.types[1].type.name : null;
          // const spirte =
          // const local = localStorage.setItem()
          setPokeInfo({
            id: json.id,
            sprite: gif,
            type: json.types[0].type.name,
            type2: type2,
            weight: json.weight,
          });
        });
    }
  });
  return (
    <div
      className="pokemon-container"
      style={{ backgroundColor: element[pokeInfo.type] }}
    >
      <img className="poke-ball" src={pokeball} alt="test" />
      <div className="pokemon-info">
        <p>{name[0].toUpperCase()}{name.slice(1)}</p>
        <p>{pokeInfo.type}</p>
        <p>{pokeInfo.type2}</p>
        <p>Avg weight: {pokeInfo.weight}</p>
      </div>
      <div className="pokemon-gif">
        <img src={pokeInfo.sprite} alt={`${name} animated gif`} />
      </div>
    </div>
  );
}

function Pokedex() {
  // const [pokeList, setPokeList] = useState([]);
  // const [audio] = useState(new Audio('/backgroundmsc.mp3'))
  useEffect(() => {
    // audio.play();
  });
  return pokemons.map((pokemon) => (
    <div>
      <Pokemon
        name={pokemon.pokemon_species.name}
        key={pokemon.pokemon_species.name}
      />
    </div>
  ));
}

export default function App() {
  return (
    <div className="pokedex-container">
      <Pokedex />
    </div>
  );
}
