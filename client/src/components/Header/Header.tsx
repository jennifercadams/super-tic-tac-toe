import * as React from "react";
import BurgerMenu from "~components/BurgerMenu/BurgerMenu";
import "./Header.css";
import { Outlet } from "react-router";

export type HeaderProps = {
    showBurgerMenu: boolean;
};

const Header = ({ showBurgerMenu }: HeaderProps) => {
    return (
        <div className={`header ${showBurgerMenu ? "show-burger" : "hide-burger"}`}>
            {showBurgerMenu && <BurgerMenu />}
            <h1>Super Tic Tac Toe</h1>
            <Outlet />
        </div>
    );
};

export default Header;
