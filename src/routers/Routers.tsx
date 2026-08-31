import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import Home from "../pages/Home";
import RecuerdosPage from "../pages/Recuerdos";
import CartaPage from "../pages/carta";
export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/recuerdos" element={<RecuerdosPage />} />
      <Route path="/carta" element={<CartaPage />} />
    </Routes>
  );
}
