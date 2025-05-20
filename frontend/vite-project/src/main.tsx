import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Log from "./components/auth/log";
import HomePage from "./components/home/home_page";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Log />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);
