import "/src/styles/Modal.scss"


export const ModalDelete = ({ modalId, deleteSong, deleteArtist, modalDelete, setModalDelete }) => {

  const handleYesBtn = (ev) => {
    ev.preventDefault()
    if (modalId === "song") {
      deleteSong()
    } else if (modalId === "artist") {
      deleteArtist()
    } else return false
    
  }

  const handleNoBtn = (ev) => {
    ev.preventDefault()
    setModalDelete(false)
  }
  

  return (
    <div className="modal modal-delete">
      <div className={`modal-window ${modalDelete ? "popup-aninmation" : ""}`}>
        <p>Are you sure you want to delete this {modalId === "song" ? "song" : "artist"}?</p>
        <button onClick={handleYesBtn} className="button">Yes</button>
        <button onClick={handleNoBtn} className="button">No, wait!</button>
      </div>
    <div className="modal-bg">
    </div>
    </div>
  )
}

export default ModalDelete