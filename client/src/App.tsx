import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "~pages/About/About";
import HowToPlay from "~pages/HowToPlay/HowToPlay";
import LandingPage from "~pages/LandingPage/LandingPage";
import PageLayout from "~pages/PageLayout/PageLayout";
import LocalPassAndPlay from "~pages/LocalPassAndPlay/LocalPassAndPlay";
import OnlineMultiplayer from "~pages/OnlineMultiplayer/OnlineMultiplayer";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PageLayout showBurgerMenu={false} />}>
                    <Route index element={<LandingPage />} />
                </Route>
                <Route element={<PageLayout showBurgerMenu={true} />}>
                    <Route path="local-pass-and-play" element={<LocalPassAndPlay />} />
                    <Route path="online-multiplayer" element={<OnlineMultiplayer />} />
                    <Route path="how-to-play" element={<HowToPlay />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
