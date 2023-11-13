import { useState } from "react";
import classNames from "classnames";
import "./Menu.css";

type Props = {
  onAction(action: "reset" | "new-round"): void;
  //   onReset(): void;
  //   onNewRound(): void;
};

export default function Menu({ onAction }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="menu">
      <button className="menu-btn" onClick={() => setMenuOpen((prev) => !prev)}>
        Actions
        <i
          className={classNames(
            "fa-solid",
            menuOpen ? "fa-chevron-up" : "fa-chevron-down"
          )}
        ></i>
        {/* {menuOpen ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-chevron-up"></i>
        )} */}
      </button>

      {menuOpen && (
        <div className="items border ">
          <button onClick={() => onAction("reset")}>Reset</button>
          <button onClick={() => onAction("new-round")}>New Round</button>
          {/* <button onClick={onReset}>Reset</button>
        <button onClick={onNewRound}>New Round</button> */}
        </div>
      )}
    </div>
  );
}
