import React from "react";
import { BrowserRouter as Routing, Routes, Route } from "react-router-dom";

/**
 * Import pages here !
 */
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routing>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </Routing>
  );
};

export default Router;
