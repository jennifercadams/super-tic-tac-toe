import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "~pages/About/About";
import HowToPlay from "~pages/HowToPlay/HowToPlay";
import LandingPage from "~pages/LandingPage/LandingPage";
import PageLayout from "~pages/PageLayout/PageLayout";
import SuperGamePassAndPlay from "~pages/SuperGamePassAndPlay/SuperGamePassAndPlay";
import SuperGameRoom from "~pages/SuperGameRoom/SuperGameRoom";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PageLayout showBurgerMenu={false} />}>
                    <Route index element={<LandingPage />} />
                </Route>
                <Route element={<PageLayout showBurgerMenu={true} />}>
                    <Route path="local-pass-and-play" element={<SuperGamePassAndPlay />} />
                    <Route path="online-multiplayer" element={<SuperGameRoom />} />
                    <Route path="how-to-play" element={<HowToPlay />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
