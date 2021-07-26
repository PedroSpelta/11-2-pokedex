import './styles.css';
import './pokemon.css';
import './modal.css';
import { useState, useEffect, useRef } from 'react';
import pokemons from './data';
import element from './elements';
import pokeball from './images/pokeball.png';
import filter from './images/filter.png'

function Pokemon(props) {
  const { name, showModal, setActualPokemon } = props;
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
          // const spirte =
          // const local = localStorage.setItem()
          setPokeInfo({
            name,
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

function Pokedex({ showModal, setActualPokemon }) {
  // const [pokeList, setPokeList] = useState([]);
  // const [audio] = useState(new Audio('/backgroundmsc.mp3'))
  function click() {
    console.log('eae');
  }
  useEffect(() => {
    // audio.play();
  });
  return pokemons.map((pokemon) => (
    <div>
      <Pokemon
        setActualPokemon={setActualPokemon}
        showModal={showModal}
        name={pokemon.pokemon_species.name}
        key={pokemon.pokemon_species.name}
      />
    </div>
  ));
}

function Modal({ showModal, setShowModal, actualPokemon }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  return showModal ? (
    <div className="modal-background" ref={modalRef} onClick={closeModal}>
      <div className="modal-div">
        <div className="modal-pokemon-visual-black">
          <div className="modal-pokemon-visual">
            <img
              className="modal-pokemon-img"
              src={`https://cdn.traction.one/pokedex/pokemon/${actualPokemon.id}.png`}
              alt=""
            />
            <img src={filter} className='filter' alt="filtro" />
            <div className="modal-pokemon-visual-info">
              <h1 className="modal-pokemon-name">
                {actualPokemon.name.toUpperCase()}
              </h1>
              <p
                className="modal-pokemon-type"
                style={{ backgroundColor: element[actualPokemon.type] }}
              >
                {actualPokemon.type.toUpperCase()}
              </p>
              <p className="modal-pokemon-id">{actualPokemon.id}</p>
            </div>
          </div>
          <div className="modal-pokemon-status">
            <p>atk def etc</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [actualPokemon, setActualPokemon] = useState({ id: 1 });
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="pokedex-container">
      <Pokedex showModal={openModal} setActualPokemon={setActualPokemon} />
      <Modal
        actualPokemon={actualPokemon}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}
