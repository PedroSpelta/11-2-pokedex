import "./styles.css";
import pokemons from "./data";

function Pokemon(props) {
  const { name, type, averageWeight, image } = props.poke;
  return (
    <div>
      <p>{name}</p>
      <p>{type}</p>
      <p>
        Avg weight: {averageWeight.value} {averageWeight.measurementUnit}
      </p>
      <img src={image} alt={`${name} animated gif`} />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Pokemon poke={pokemons[0]} />
    </div>
  );
}
