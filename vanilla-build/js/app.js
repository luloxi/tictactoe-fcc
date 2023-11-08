import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  // The first load of the document
  view.render(store.game, store.stats);

  // When the current tab state changes
  // We can listen to the statechange event on the store to render the view each time the state changes
  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  // When another tab changes the state changes
  window.addEventListener("storage", () => {
    console.log("State changed from another tab");
  });

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // Advance to the next state by pushing a move to the moves array
    // We cast it as a number because the square id is a string by default
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
