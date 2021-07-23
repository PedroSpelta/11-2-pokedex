import './styles.css';
import './pokemon.css';
import { useState, useEffect } from 'react';

function Pokemon(props) {
  const { name } = props;
  const [pokeInfo, setPokeInfo] = useState({});
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((json) => {
        const gif = json.sprites.versions.['generation-v'].['black-white'].animated.front_default;
        // const spirte =
        setPokeInfo({
          id: json.id,
          sprite:
            gif,
          // json.sprites.versions.['generation-v'].['black-white'].animated.front_default,
            type: json.types[0].type.name,
          weight: json.weight
        });
      });
  });
  return (
    <div className="pokemon-container">
      <div className="pokemon-info">
        <p>{name}</p>
        <p>{pokeInfo.type}</p>
        <p>
          Avg weight: {pokeInfo.weight}
        </p>
      </div>
      <div className="pokemon-gif">
        <img src={pokeInfo.sprite} alt={`${name} animated gif`} />
      </div>
    </div>
  );
}

function Pokedex() {
  const [pokeList, setPokeList] = useState([]);
  const [audio] = useState(new Audio('/backgroundmsc.mp3'))
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokedex/original-johto')
      .then((res) => res.json())
      .then((json) => {
        setPokeList(json.pokemon_entries);
      });
    audio.play();
  });
  return pokeList.map((pokemon) => <Pokemon name={pokemon.pokemon_species.name} key={pokemon.pokemon_species.name} />);
}

export default function App() {
  return (
    <div className="pokedex-container">
      <Pokedex />
    </div>
  );
}
