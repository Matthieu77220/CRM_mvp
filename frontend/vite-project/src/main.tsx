import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Log from "./components/auth/log";
import HomePage from "./components/home/home_page";
import Clients from "./components/home/assets/clients"
import CoCLients from "./components/home/assets/co_clients";
import Dossiers from "./components/home/assets/dossiers";
import Prescribteurs from "./components/home/assets/prescribteurs";
import LogOut from "./components/home/assets/log_out";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Log />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/coclients" element={<CoCLients />} />
      <Route path="/dossiers" element={<Dossiers />} />
      <Route path="/prescribteurs" element={<Prescribteurs />} />
      <Route path="/logout" element={<LogOut />} />
    </Routes>
  </BrowserRouter>
);
