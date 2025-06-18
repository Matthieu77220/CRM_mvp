import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Log from "./components/auth/sign_up";
import Login from "./components/auth/login";
import HomePage from "./components/home/home_page";
import Clients from "./components/home/assets/clients";
import CoCLients from "./components/home/assets/co_clients";
import Dossiers from "./components/home/assets/dossiers";
import Prescribteurs from "./components/home/assets/prescribteurs";
import Contact from "./components/home/assets/contact";
import Utilisateur from "./components/home/assets/utilisateur";



function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#eaf3fb] overflow-hidden">
      {/* Bulles décoratives */}
      <svg className="absolute left-0 top-0 w-1/3 h-1/3 opacity-30" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="200" fill="#b3d4fc" />
      </svg>
      <svg className="absolute right-0 bottom-0 w-1/4 h-1/4 opacity-20" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="150" fill="#b3d4fc" />
      </svg>
      {/* Contenu principal */}
      <div className="z-10 flex-1 flex flex-col items-start justify-center px-8">
        <h1 className="text-5xl font-extrabold text-[#1a2a3a] mb-6 leading-tight">
          Bienvenue sur<br />votre CRM
        </h1>
        <div className="flex gap-4 mb-4">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => navigate("/user-login")}
          >
            Connexion utilisateur
          </button>
          <button
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => navigate("/client-message")}
          >
            Espace client
          </button>
        </div>
      </div>
      {/* Illustration SVG à droite */}
      <div className="z-10 flex-1 flex items-center justify-center">
        <svg width="320" height="240" viewBox="0 0 320 240" fill="none">
          <rect x="60" y="40" width="200" height="140" rx="16" fill="#fff"/>
          <rect x="80" y="60" width="40" height="40" rx="8" fill="#b3d4fc"/>
          <rect x="140" y="60" width="80" height="12" rx="6" fill="#eaf3fb"/>
          <rect x="140" y="80" width="60" height="8" rx="4" fill="#eaf3fb"/>
          <rect x="80" y="120" width="140" height="12" rx="6" fill="#eaf3fb"/>
          <circle cx="250" cy="170" r="20" fill="#b3d4fc"/>
          <ellipse cx="90" cy="180" rx="18" ry="10" fill="#b3d4fc"/>
        </svg>
      </div>
    </div>
  );
}

function ClientMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Contacter votre courtier</h2>
      <form className="flex flex-col gap-4 w-80">
        <input type="text" placeholder='Votre prénom' className="border rounded px-3 py-2" required />
        <input type="text" placeholder='Votre nom de famille' className="border rounded px-3 py-2" required />
        <input type="email" placeholder="Votre email" className="border rounded px-3 py-2" required />
        <textarea placeholder="Votre message" className="border rounded px-3 py-2" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Envoyer</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Log />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/client-message" element={<ClientMessage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/coclients" element={<CoCLients />} />
        <Route path="/dossiers" element={<Dossiers />} />
        <Route path="/prescribteurs" element={<Prescribteurs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/utilisateur" element={<Utilisateur />} />
      </Routes>
    </Router>
  );
}

export default App;