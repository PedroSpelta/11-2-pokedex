import './styles.css';
import './pokemon.css';
import './modal.css';
import { useState, useEffect, useRef } from 'react';
import Pokedex from './components/pokedex';
import Modal from './components/modal';
import LeftNav from './components/leftnav';
import element from './elements';
import { FaArrowRight} from 'react-icons/fa';
const elementArray = Object.keys(element);

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [actualPokemon, setActualPokemon] = useState({ id: 1 });
  const [selectedElement, setSelectedElement] = useState(elementArray);
  const [showLeftNav, setShowLeftNav] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="main">
      <LeftNav
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        showLeftNav={showLeftNav}
        setShowLeftNav={setShowLeftNav}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />
      <div
        className={`pokedex-container ${showLeftNav ? null : 'left-nav-open'}`}
      >
        <Pokedex
          showModal={openModal}
          selectedElement={selectedElement}
          nameFilter={nameFilter}
          setActualPokemon={setActualPokemon}
          showLeftNav={showLeftNav}
        />
      </div>
        <Modal
          actualPokemon={actualPokemon}
          showModal={showModal}
          setShowModal={setShowModal}
          showLeftNav={showLeftNav}
        />
    </div>
  );
}
