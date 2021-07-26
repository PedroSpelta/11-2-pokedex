import './styles.css';
import './pokemon.css';
import './modal.css';
import { useState, useEffect, useRef } from 'react';
import pokemons from './data';
import element from './elements';
import pokeball from './images/pokeball.png';
import filter from './images/filter.png';

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
            <img src={filter} className="filter" alt="filtro" />
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
            <p className="modal-poke-s-name">Nº{actualPokemon.id}</p>
            <p className="modal-poke-sudo-name">sudo name</p>
            <p className="modal-poke-t-abil">Habilidades</p>
            <p className="modal-poke-h1">{actualPokemon.ability1}</p>
            <p className="modal-poke-h1">{actualPokemon.ability2}</p>
            <div className="modal-hw-div">


              <div className="modal-hw-sub-div">
                <p className="modal-info-title">Height:</p>
                <p className="modal-info-text">{actualPokemon.height} m</p>
                <p className="modal-info-text">
                  {(actualPokemon.height * 3.281).toFixed(0)}'
                </p>
              </div>

<div className='modal-hw-spacer'/>

        <div className="modal-hw-sub-div">
                <p className="modal-info-title">Weight:</p>
                <p className="modal-info-text">{actualPokemon.weight} <keygen /></p>
                <p className="modal-info-text">
                  {(actualPokemon.weight * 2.205).toFixed(1)} lbs
                </p>
              </div>

            </div>
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
