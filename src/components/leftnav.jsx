import './leftnav.css';
import element from '../elements';
import { useEffect, useState } from 'react';

function CheckBoxElement({ text, selectedElem, setSelectedElem }) {
  return (
    <label>
      <input
        name={text}
        type="checkbox"
        checked={selectedElem.includes(text) ? true : false}
        onChange={(event) => {
          if (event.target.checked) {
            setSelectedElem([...selectedElem, event.target.name]);
            return;
          }
          setSelectedElem(selectedElem.filter((e) => e !== event.target.name));
        }}
      />
      {`${text[0].toUpperCase()}${text.slice(1)}`}
    </label>
  );
}

const elementArray = Object.keys(element);

function LeftNav({ selectedElement, setSelectedElement }) {
  return (
    <div className="nav-div">
      {elementArray.map((elem) => (
        <CheckBoxElement
          key={elem}
          selectedElem={selectedElement}
          setSelectedElem={setSelectedElement}
          text={elem}
        />
      ))}
      <button onClick={() => setSelectedElement([])}> teste </button>
    </div>
  );
}

export default LeftNav;
