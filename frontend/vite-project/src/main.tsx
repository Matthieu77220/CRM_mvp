import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Log from "./components/auth/sign_up";
import Login from "./components/auth/login";
import HomePage from "./components/home/home_page";
import Clients from "./components/home/assets/clients"
import CoCLients from "./components/home/assets/co_clients";
import Dossiers from "./components/home/assets/dossiers";
import Prescribteurs from "./components/home/assets/prescribteurs";
import Contact from "./components/home/assets/contact";
import Utilisateur from "./components/home/assets/utilisateur";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Log />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/coclients" element={<CoCLients />} />
      <Route path="/dossiers" element={<Dossiers />} />
      <Route path="/prescribteurs" element={<Prescribteurs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/utilisateur" element={<Utilisateur />} />
    </Routes>
  </BrowserRouter>
);
