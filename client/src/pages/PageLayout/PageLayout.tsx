import * as React from "react";
import { Outlet } from "react-router";
import Header from "~components/Header/Header";

export type PageLayoutProps = {
    showBurgerMenu: boolean;
};

const PageLayout = ({ showBurgerMenu }: PageLayoutProps) => {
    return (
        <div className="page">
            <Header showBurgerMenu={showBurgerMenu} />
            <Outlet />
        </div>
    );
};

export default PageLayout;
