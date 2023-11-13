import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import classNames from "classnames";
import { useLocalStorage } from "./useLocalStorage";
import { deriveGame, deriveStats } from "./utils";
export default function App() {
    const [state, setState] = useLocalStorage("game-state-key", {
        currentGameMoves: [],
        history: {
            currentRoundGames: [],
            allGames: [],
        },
    });
    const game = deriveGame(state);
    const stats = deriveStats(state);
    function resetGame(isNewRound) {
        setState((prev) => {
            const stateClone = structuredClone(prev);
            const { status, moves } = game;
            if (status.isComplete) {
                stateClone.history.currentRoundGames.push({
                    moves,
                    status: {
                        isComplete: status.isComplete,
                        winner: status.winner,
                    },
                });
            }
            stateClone.currentGameMoves = [];
            if (isNewRound) {
                stateClone.history.allGames.push(...stateClone.history.currentRoundGames);
                stateClone.history.currentRoundGames = [];
            }
            return stateClone;
        });
    }
    function handlePlayerMove(squareId, player) {
        setState((prev) => {
            const stateClone = structuredClone(prev);
            stateClone.currentGameMoves.push({
                squareId,
                player,
            });
            return stateClone;
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx("main", { children: _jsxs("div", { className: "grid", children: [_jsxs("div", { className: classNames("turn", game.currentPlayer.colorClass), children: [_jsx("i", { className: classNames("fa-solid", game.currentPlayer.iconClass) }), _jsxs("p", { children: [game.currentPlayer.name, ", you're up!"] })] }), _jsx(Menu, { onAction: (action) => resetGame(action == "new-round") }), [1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
                            const existingMove = game.moves.find((move) => move.squareId === squareId);
                            return (_jsx("div", { className: "square shadow", onClick: () => {
                                    if (existingMove)
                                        return;
                                    handlePlayerMove(squareId, game.currentPlayer);
                                }, children: existingMove && (_jsx("i", { className: classNames("fa-solid", existingMove.player.colorClass, existingMove.player.iconClass) })) }, squareId));
                        }), _jsxs("div", { className: "score shadow", style: { backgroundColor: "var(--turquoise)" }, children: [_jsx("p", { children: "Player 1" }), _jsxs("span", { children: [stats.playerWithStats[0].wins, " Wins"] })] }), _jsxs("div", { className: "score shadow", style: { backgroundColor: "var(--light-gray" }, children: [_jsx("p", { children: "Ties" }), _jsx("span", { children: stats.ties })] }), _jsxs("div", { className: "score shadow", style: { backgroundColor: "var(--yellow)" }, children: [_jsx("p", { children: "Player 2" }), _jsxs("span", { children: [stats.playerWithStats[1].wins, " Wins"] })] })] }) }), _jsx(Footer, {}), game.status.isComplete && (_jsx(Modal, { message: game.status.winner ? `${game.status.winner.name} wins!` : "Tie!", onClick: () => resetGame(false) }))] }));
}
