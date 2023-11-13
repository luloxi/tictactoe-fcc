import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
const rootElement = document.getElementById("react-root");
// if (!rootElement)
// throw new Error("Incorrect configuration: No #react-root element found");
// Adding an exclamation after rootElement does the same as the if statement above
const root = createRoot(rootElement);
root.render(_jsx(StrictMode, { children: _jsx(App, {}) }));
