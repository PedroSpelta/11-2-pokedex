import './styles.css';
import './pokemon.css';
import './modal.css';
import { useState, useEffect, useRef } from 'react';
import Pokedex from './components/pokedex';
import Modal from './components/modal';
import LeftNav from './components/leftnav';
import element from './elements';
const elementArray = Object.keys(element);

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [actualPokemon, setActualPokemon] = useState({ id: 1 });
  const [selectedElement, setSelectedElement] = useState(elementArray);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="main">
      <LeftNav
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
      <div className="pokedex-container">
        <Pokedex
          showModal={openModal}
          selectedElement={selectedElement}
          setActualPokemon={setActualPokemon}
        />
        <Modal
          actualPokemon={actualPokemon}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
}
