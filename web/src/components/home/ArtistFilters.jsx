import "/src/styles/Filters.scss";
import { useState } from "react";

const ArtistFilters = ({ setValueName }) => {

  const [checked, setChecked] = useState(false);

     // avoid reload with enter
     const handleKeyDown = (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
      }
    }

    const handleChange = (ev) => {
      const value = ev.target.value;
      setValueName(value);
    }

    const handleCheckbox = (ev) => {
      setChecked(ev.target.checked)
    }

  return (
    <div className="filters-box">
      <div className="filters-text">
        
        <label htmlFor="filters-dropdown" className="filter-icon"><p>Filters</p><i className={`fa-solid fa-caret-down ${!checked ? "filter-arrow-up" : "filter-arrow-down"}`}></i></label>
      </div>
      <input
        type="checkbox"
        id="filters-dropdown"
        className="filters-checkbox"
        onChange={handleCheckbox}
      />
      <form className="filters filters-artist">
        <label htmlFor="name">Name</label>
        <input
          className="input"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          id="name"
          type="text"
        />
      </form>
    </div>
  );
};

export default ArtistFilters;
