import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Modal.css";
export default function Modal({ message, onClick }) {
    return (_jsx("div", { className: "modal", children: _jsxs("div", { className: "modal-contents", children: [_jsx("p", { children: message }), _jsx("button", { onClick: onClick, children: "Play again" })] }) }));
}
