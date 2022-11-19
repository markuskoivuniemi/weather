import "./Dropdown.css"
import React, {useState} from "react";

export const Dropdown = ({data, item, setLocation, setForecastData}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = value => () => {
        setLocation(value);
        setForecastData(null)
        setIsOpen(false);
    };
    
    const options = data;

  return(
    <div className="Dropdown">
        <div className="DropdownHeader" onClick={toggleDropdown}>{item}</div>
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