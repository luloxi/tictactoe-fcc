import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import classNames from "classnames";
import "./Menu.css";
export default function Menu({ onAction }) {
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsxs("div", { className: "menu", children: [_jsxs("button", { className: "menu-btn", onClick: () => setMenuOpen((prev) => !prev), children: ["Actions", _jsx("i", { className: classNames("fa-solid", menuOpen ? "fa-chevron-up" : "fa-chevron-down") })] }), menuOpen && (_jsxs("div", { className: "items border ", children: [_jsx("button", { onClick: () => onAction("reset"), children: "Reset" }), _jsx("button", { onClick: () => onAction("new-round"), children: "New Round" })] }))] }));
}
