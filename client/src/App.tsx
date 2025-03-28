import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "~pages/LandingPage/LandingPage";
import SuperGamePassAndPlay from "~pages/SuperGamePassAndPlay/SuperGamePassAndPlay";
import SuperGameRoom from "~pages/SuperGameRoom/SuperGameRoom";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="local-pass-and-play" element={<SuperGamePassAndPlay />} />
                <Route path="online-multiplayer" element={<SuperGameRoom />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
