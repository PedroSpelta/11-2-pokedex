import { useEffect } from 'react';
import element from '../elements';
import pokeball from '../images/pokeball.png';

function Pokemon(props) {
  const { showModal, setActualPokemon, pokeInfo} = props;
  useEffect(() => console.log('pokemon'))
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
            {pokeInfo.name[0].toUpperCase()}
            {pokeInfo.name.slice(1)}
          </p>
          <p className="pokemon-type">{pokeInfo.type}</p>
          <p className="pokemon-type">{pokeInfo.type2}</p>
          <p>{pokeInfo.weight} kg</p>
        </div>
        <div className="pokemon-gif">
          <img src={pokeInfo.sprite} alt={`${pokeInfo.name} animated gif`} />
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
