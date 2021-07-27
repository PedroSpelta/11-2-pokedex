import { useState, useEffect } from 'react';
import element from '../elements';
import pokeball from '../images/pokeball.png';

function Pokemon(props) {
  const { name, showModal, setActualPokemon} = props;
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
          const type2 =
            json.types[1] !== undefined ? json.types[1].type.name : null;
          const ability2 =
            json.abilities[1] !== undefined
              ? json.abilities[1].ability.name
              : null;
          // const spirte =
          // const local = localStorage.setItem()
          setPokeInfo({
            name,
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
        });
    }
  });
  return (
    <div
      onClick={() => {
        setActualPokemon(pokeInfo);
        showModal();
      }}
    >
      <div
        className="pokemon-container"
        style={{ backgroundColor: element[pokeInfo.type] }}
      >
        <img className="poke-ball" src={pokeball} alt="test" />
        <p className="pokemon-id"># {pokeInfo.id}</p>
        <div className="pokemon-info">
          <p className="pokemon-name">
            {name[0].toUpperCase()}
            {name.slice(1)}
          </p>
          <p className="pokemon-type">{pokeInfo.type}</p>
          <p className="pokemon-type">{pokeInfo.type2}</p>
          <p>{pokeInfo.weight} kg</p>
        </div>
        <div className="pokemon-gif">
          <img src={pokeInfo.sprite} alt={`${name} animated gif`} />
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
