import React, { useEffect, useState } from 'react'
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
      
      <svg className="absolute left-0 top-0 w-1/3 h-1/3 opacity-30" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="200" fill="#b3d4fc" />
      </svg>
      <svg className="absolute right-0 bottom-0 w-1/4 h-1/4 opacity-20" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="150" fill="#b3d4fc" />
      </svg>
      
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
  const [form, setForm] = useState({
      sender_name: "",
      sender_email: "",
      content: "",
      recipient_id: "",
    });
  const [succes, setSucces] = useState(false);
  useEffect(() =>{
    if(succes) {
      const timer = setTimeout(() => setSucces(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [succes]);
  const [courtiers, setCourtiers] = useState<{id: number, first_name: String, last_name: string, email: string}[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users/")
    .then(res => res.json())
    .then(data => setCourtiers(data))
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/messages", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...form, recipient_id: Number(form.recipient_id)}),
    });
    if(response.ok){
      setSucces(true);
      setForm({sender_name: "", sender_email: "", content: "", recipient_id: ""});
    } else {
      alert("erreur lors de l'envoie du message");
    }
  };

  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Contacter votre courtier</h2>
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
              <div>
                <label className="bloc text-sm font-medium mb-1 text-zinc-700">Choisir un courtier</label>
                <select 
                name="recipient_id"
                value={form.recipient_id}
                onChange={handleChange}
                required
                className="w-full border border-zinc-300 rounded px-3 py-2"
                >
                  <option value="">Sélectionnez un courtier</option>
                  {courtiers.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.first_name} {c.last_name} ({c.email})
                    </option>
                  ))}
                </select>
              </div> 
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-700">Votre prénom</label>
                <input
                  type="text"
                  name="sender_name"
                  placeholder="Votre prénom"
                  className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.sender_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-700">Votre email</label>
                <input
                  type="email"
                  name="sender_email"
                  placeholder="Votre email"
                  className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.sender_email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-700">Votre message</label>
                <textarea
                  name="content"
                  placeholder="Votre message"
                  className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                Envoyer
              </button>
              {succes && (
                <div className="text-green-600 mt-2 text-center">
                  Message envoyé !
                </div>
              )}
              <button
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </button>
            </form>
          </div>
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