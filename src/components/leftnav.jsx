import './leftnav.css';
import element from '../elements';
import { FaArrowRight } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

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

function LeftNav({
  selectedElement,
  setSelectedElement,
  showLeftNav,
  setShowLeftNav,
}) {
  return (
    <>
      <button
        className="open-nav-button"
        onClick={() => setShowLeftNav(!showLeftNav)}
      >
        <FaArrowRight size={'22px'} />
      </button>
      <div
        className="nav-div"
        style={showLeftNav ? {} : { marginLeft: '-200px' }}
      >
        <div className="close-left-nav">
          <IoMdClose onClick={() => setShowLeftNav(!showLeftNav)} />
        </div>
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
    </>
  );
}

export default LeftNav;
