import React from "react";
import { BrowserRouter as Routing, Routes, Route } from "react-router-dom";

/**
 * Import pages here !
 */
import Home from "../pages/Home";
import LoadingPage from "../pages/LoadingPage";

const Router = () => {
  return (
    <Routing basename="/devtools/">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/loader" element={<LoadingPage />}></Route>
      </Routes>
    </Routing>
  );
};

export default Router;
