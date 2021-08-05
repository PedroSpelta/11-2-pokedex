import element from '../elements';
import filter from '../images/filter.png';
import { Radar } from 'react-chartjs-2';
import { useRef } from 'react';

function Modal({ showModal, setShowModal, actualPokemon, showLeftNav }) {
  const modalRef = useRef();
  const data = {
    labels: 'HP DEF SP.DEF SPEED SP.ATK ATK'.split(' '),
    datasets: [
      {
        data: [
          actualPokemon.hp,
          actualPokemon.def,
          actualPokemon.spdef,
          actualPokemon.speed,
          actualPokemon.spatk,
          actualPokemon.atk,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      pointLabels: {
        fontSize: 40,
      },
    },
    maintainAspectRatio: false,
    scale: {
      beginAtZero: true,
      min: 0,
      max: 255,
      stepSize: 100,
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
        pointLabels: {
          font: {
            size: 13,
            weight: 'bold',
          },
        },
      },
    },
    responsive: false,
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  return showModal ? (
    <div className={`modal-background ${showLeftNav ? 'modal-compressed': null}`} ref={modalRef} onClick={closeModal}>
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
              <div className="modal-type-div">
                <p
                  className="modal-pokemon-type"
                  style={{ backgroundColor: element[actualPokemon.type] }}
                >
                  {actualPokemon.type.toUpperCase()}
                </p>
                {actualPokemon.type2 ? (
                  <p
                    className="modal-pokemon-type"
                    style={{ backgroundColor: element[actualPokemon.type2] }}
                  >
                    {actualPokemon.type2.toUpperCase()}
                  </p>
                ) : null}
              </div>
              <p className="modal-pokemon-id">{actualPokemon.id}</p>
            </div>
          </div>
          <div className="modal-pokemon-status">
            <p className="modal-poke-s-name">Nº{actualPokemon.id}</p>
            <div className="modal-abilities-div">
              <p className="modal-info-title">Abilities:</p>
              <p className="modal-info-text">{actualPokemon.ability1}</p>
              <p className="modal-info-text">{actualPokemon.ability2}</p>
            </div>
            <div className="modal-hw-div">
              <div className="modal-hw-sub-div">
                <p className="modal-info-title">Height:</p>
                <p className="modal-info-text">{actualPokemon.height} m</p>
                <p className="modal-info-text">
                  {(actualPokemon.height * 3.281).toFixed(0)}'
                </p>
              </div>

              <div className="modal-hw-spacer" />

              <div className="modal-hw-sub-div">
                <p className="modal-info-title">Weight:</p>
                <p className="modal-info-text">{actualPokemon.weight} kg</p>
                <p className="modal-info-text">
                  {(actualPokemon.weight * 2.205).toFixed(1)} lbs
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-chart">
          <Radar
            className="modal-radar"
            data={data}
            width={200}
            height={200}
            options={options}
          />
          <div className="modal-chart-status">
            <div>
              <p className="modal-stat-title">HP: </p>
              <p className="modal-stat-num">{actualPokemon.hp}</p>
            </div>
            <div>
              <p className="modal-stat-title">ATTACK:</p>
              <p className="modal-stat-num">{actualPokemon.atk}</p>
            </div>
            <div>
              <p className="modal-stat-title">DEFFENSE:</p>
              <p className="modal-stat-num">{actualPokemon.def}</p>
            </div>
            <div>
              <p className="modal-stat-title">SP.ATK:</p>
              <p className="modal-stat-num">{actualPokemon.spatk}</p>
            </div>
            <div>
              <p className="modal-stat-title">SP.DEF:</p>
              <p className="modal-stat-num">{actualPokemon.spdef}</p>
            </div>
            <div>
              <p className="modal-stat-title">SPEED:</p>
              <p className="modal-stat-num">{actualPokemon.speed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;