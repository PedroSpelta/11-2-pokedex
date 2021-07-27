import './leftnav.css';
import element from '../elements';
import { useState } from 'react';

function CheckBoxElement({ text, selectedElem, setSelectedElem }) {
  return (
    <label
      onChange={(event) => {
        if (event.target.checked) {
          setSelectedElem([...selectedElem, event.target.name]);
          return;
        }
        setSelectedElem(selectedElem.filter((e) => e !== event.target.name));
      }}
    >
      <input name={text} type="checkbox" />
      {`${text[0].toUpperCase()}${text.slice(1)}`}
    </label>
  );
}

const elementArray = Object.keys(element);

function LeftNav(props) {
  const [selectedElem, setSelectedElem] = useState([]);
  return (
    <div className="nav-div">
      {elementArray.map((elem) => (
        <CheckBoxElement
          key={elem}
          selectedElem={selectedElem}
          setSelectedElem={setSelectedElem}
          text={elem}
        />
      ))}
    </div>
  );
}

export default LeftNav;
