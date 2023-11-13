import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Modal.css";
export default function Modal() {
    return (_jsx("div", { className: "modal hidden", "data-id": "modal", children: _jsxs("div", { className: "modal-contents", children: [_jsx("p", { "data-id": "modal-text", children: "Player 1 wins!" }), _jsx("button", { "data-id": "modal-btn", children: "Play again" })] }) }));
}
