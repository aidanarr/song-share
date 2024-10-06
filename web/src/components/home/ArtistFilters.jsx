import "/src/styles/Filters.scss";

const ArtistFilters = ({ setValueName }) => {

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

  return (
    <div>
      <div className="filters-text">
        <p>Filters:</p>
        <label htmlFor="filters-dropdown" className="filter-icon"></label>
      </div>
      <input
        type="checkbox"
        id="filters-dropdown"
        className="filters-checkbox"
      />
      <form className="filters">
        <label htmlFor="name">Name:</label>
        <input
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
