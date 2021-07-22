import "./styles.css";
import pokemons from "./data";
import "./pokemon.css";

function Pokemon(props) {
  const { name, type, averageWeight, image } = props.pokemon;
  return (
    <div className="pokemon-container">
      <div className="pokemon-info">
        <p>{name}</p>
        <p>{type}</p>
        <p>
          Avg weight: {averageWeight.value} {averageWeight.measurementUnit}
        </p>
      </div>
      <div className="pokemon-gif">
        <img src={image} alt={`${name} animated gif`} />
      </div>
    </div>
  );
}

function Pokedex(props) {
  const { pokemons } = props;
  return pokemons.map((pokemon) => (
    <Pokemon key={pokemon.id} pokemon={pokemon} />
  ));
}

export default function App() {
  return (
    <div className="App">
      <div className="pokedex-container">
        <Pokedex pokemons={pokemons} />
      </div>
      {/* <Pokemon poke={pokemons[0]} /> */}
    </div>
  );
}
