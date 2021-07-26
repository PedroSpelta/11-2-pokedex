
import pokemons from '../data';
import Pokemon from '../components/pokemon'

function Pokedex({ showModal, setActualPokemon }) {
  // const [pokeList, setPokeList] = useState([]);
  // const [audio] = useState(new Audio('/backgroundmsc.mp3'))
  // useEffect(() => {
  //   // audio.play();
  // });
  return pokemons.map((pokemon) => (
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