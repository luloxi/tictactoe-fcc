export const players = [
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
export function deriveGame(state) {
    const currentPlayer = players[state.currentGameMoves.length % 2];
    const winningPatterns = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7], // Diagonal 2
    ];
    let winner = null;
    for (const player of players) {
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
export function deriveStats(state) {
    return {
        playerWithStats: players.map((player) => {
            // Filtering the history array to get the length of the array of games won by the player
            const wins = state.history.currentRoundGames.filter((game) => { var _a; return ((_a = game.status.winner) === null || _a === void 0 ? void 0 : _a.id) === player.id; }).length;
            return Object.assign(Object.assign({}, player), { wins });
        }),
        ties: state.history.currentRoundGames.filter((game) => game.status.winner == null).length,
    };
}
