import "./Dropdown.css"
import React, {useState} from "react";

export const Dropdown = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const [selection, setSelection] = useState(null);
    const selectOption = value => () => {
        setSelection(value);
        setIsOpen(false);
    };
    
    const options = ["kek", "kik", "kok"]

  return(
    <div className="Dropdown">
        <div className="DropdownHeader" onClick={toggleDropdown}>{selection}</div>
        {isOpen && (
            <div className="DropdownListDiv">
                <ul className="DropdownList">
                    {options.map((option) => (
                    <li className="DropdownListItem" onClick={selectOption(option)} key={Math.random()}>{option}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
}

export default Dropdown