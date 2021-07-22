import "./styles.css";
import pokemons from "./data";
import "./pokemon.css";
import { useState } from "react";

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
  // const [poke, setPoke] = useState([]);
  return pokemons.map((pokemon) => (
    <Pokemon key={pokemon.id} pokemon={pokemon} />
  ));
}

function PokeApi() {
  const [pokeList, setPokeList] = useState([]);
  async function pokemonFetch() {
    // const baseUrl = 'https://pokeapi.co/api/v2/';
    const pokeResponse = await fetch(
      "https://pokeapi.co/api/v2/pokedex/original-johto"
    );
    const pokeData = (await pokeResponse).json().then((data) => {
      data.pokemon_entries.forEach((pokemon) => {});
    });
  }
  pokemonFetch();
  return <h1>teste</h1>;
}

export default function App() {
  return (
    <div className="pokedex-container">
      <Pokedex pokemons={pokemons} />
      <PokeApi />
    </div>
  );
}
