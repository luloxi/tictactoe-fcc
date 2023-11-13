import "./Modal.css";

export default function Modal() {
  return (
    <div className="modal hidden" data-id="modal">
      <div className="modal-contents">
        <p data-id="modal-text">Player 1 wins!</p>
        <button data-id="modal-btn">Play again</button>
      </div>
    </div>
  );
}
