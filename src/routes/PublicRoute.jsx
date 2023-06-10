import {
    Route,
  } from "react-router-dom";
import { Home } from "../pages/Home";

  
export const PublicRoute = () => {
  return (
    <Route path="/" element={<Home />} exact />
    )
}
