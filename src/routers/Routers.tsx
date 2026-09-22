import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import Home from "../pages/Home";
import RecuerdosPage from "../pages/Recuerdos";
import CartaPage from "../pages/carta";
import SorpresaPage from "../pages/Sorpresa";
import GirasolesPage from "../pages/Girasoles";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/recuerdos" element={<RecuerdosPage />} />
      <Route path="/carta" element={<CartaPage />} />
      <Route path="/sorpresa" element={<SorpresaPage />} />
      <Route path="/girasoles" element={<GirasolesPage />} />
    </Routes>
  );
}
