import * as React from "react";
import { useState } from "react";
import { Link } from "react-router";
import "./BurgerMenu.css";

const BurgerMenu = () => {
    const [ menuOpen, setMenuOpen ] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="burger-menu" onClick={toggleMenu}>
            <div className="hamburger">
                <div className={`burger top-bun${menuOpen ? " menu-open" : " menu-closed"}`} />
                <div className={`burger patty${menuOpen ? " menu-open" : " menu-closed"}`} />
                <div className={`burger bottom-bun${menuOpen ? " menu-open" : " menu-closed"}`} />
            </div>
            <div className={`navigation${menuOpen ? " menu-open" : " menu-closed"}`}>
                <Link to="/">Home</Link>
                <Link to="/local-pass-and-play">Local Pass And Play</Link>
                <Link to="/online-multiplayer">Online Multiplayer</Link>
                <Link to="/how-to-play">How To Play</Link>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
};

export default BurgerMenu;
