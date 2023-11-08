const initialValue = {
  currentGameMoves: [],
  history: {
    currentRoundGames: [],
    allGames: [],
  },
};

// Extending EventTarget allows objects to receive events and have event listeners attached to them
export default class Store extends EventTarget {
  constructor(key, players) {
    // super() is the keyword that allows us to inherit from EventTarget
    super();
    this.storageKey = key;
    this.players = players;
  }

  get stats() {
    const state = this.#getState();

    return {
      playerWithStats: this.players.map((player) => {
        // Filtering the history array to get the length of the array of games won by the player
        const wins = state.history.currentRoundGames.filter(
          (game) => game.status.winner?.id === player.id
        ).length;

        return {
          ...player,
          wins,
        };
      }),
      ties: state.history.currentRoundGames.filter(
        (game) => game.status.winner == null
      ).length,
    };
  }

  // Adding the "get" getter allows calling the function without the parentheses on app.js
  get game() {
    const state = this.#getState();

    const currentPlayer = this.players[state.currentGameMoves.length % 2];

    const winningPatterns = [
      [1, 2, 3], // Top row
      [4, 5, 6], // Middle row
      [7, 8, 9], // Bottom row
      [1, 4, 7], // Left column
      [2, 5, 8], // Middle column
      [3, 6, 9], // Right column
      [1, 5, 9], // Diagonal 1
      [3, 5, 7], // Diagonal 2
    ];

    let winner = null;

    for (const player of this.players) {
      const selectedSquareIds = state.currentGameMoves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.squareId);

      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquareIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.currentGameMoves,
      currentPlayer,
      status: {
        isComplete: winner != null || state.currentGameMoves.length === 9,
        winner,
      },
    };
  }

  playerMove(squareId) {
    // structuredClone gets a clone of the state object without altering the original
    const stateClone = structuredClone(this.#getState());

    stateClone.currentGameMoves.push({
      squareId,
      player: this.game.currentPlayer,
    });

    this.#saveState(stateClone);
  }

  reset() {
    const stateClone = structuredClone(this.#getState());

    const { status, moves } = this.game;

    if (status.isComplete) {
      stateClone.history.currentRoundGames.push({
        moves,
        status,
      });
    }

    stateClone.currentGameMoves = [];

    this.#saveState(stateClone);
  }

  newRound() {
    this.reset();

    const stateClone = structuredClone(this.#getState());
    stateClone.history.allGames.push(...stateClone.history.currentRoundGames);
    stateClone.history.currentRoundGames = [];

    this.#saveState(stateClone);
  }

  #getState() {
    const item = window.localStorage.getItem(this.storageKey);
    return item ? JSON.parse(item) : initialValue;
  }

  #saveState(stateOrFunction) {
    const prevState = this.#getState();

    let newState;

    switch (typeof stateOrFunction) {
      case "function":
        newState = stateOrFunction(prevState);
        break;

      case "object":
        newState = stateOrFunction;
        break;

      default:
        throw new Error("Invalid argument passed to saveState");
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(newState));
    // Emitting event that'll trigger the statechange event listener on app.js
    this.dispatchEvent(new Event("statechange"));
  }
}
