import "/src/styles/Filters.scss"

const SongFilters = ({ setValueTitle, setValueArtist, songGenres, setValueGenre }) => {

   // avoid reload with enter
   const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
    }
  }

  const handleChange = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;

    if (id === "title") {
      setValueTitle(value);
    } else if (id === "artist") {
      setValueArtist(value);
    } else if (id === "genre"){
      setValueGenre(value)
    } 
  }

  return (
    <div>
      <div className="filters-text">
      <p>Filters:</p>
      <label htmlFor="filters-dropdown" className="filter-icon"></label>
      </div>
      <input type="checkbox" id="filters-dropdown" className="filters-checkbox" />
      <form className="filters">
        <label htmlFor="title">Title:</label>
        <input onKeyDown={handleKeyDown} onChange={handleChange} id="title" type="text" />
        <label htmlFor="artist">Artist:</label>
        <input onKeyDown={handleKeyDown} onChange={handleChange} id="artist" type="text" />
        <label htmlFor="genre">Genre:</label>
        <select onChange={handleChange} name="genre" id="genre">
          <option value="">all</option>
          {songGenres.map((genre, i) => <option key={i} value={genre}>{genre}</option>)}
        </select>
      </form>
    </div>
  )
}

export default SongFilters