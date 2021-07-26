import './styles.css';
import './pokemon.css';
import './modal.css';
import { useState, useEffect, useRef } from 'react';
import Pokedex from './components/pokedex';
import Modal from './components/modal';


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
