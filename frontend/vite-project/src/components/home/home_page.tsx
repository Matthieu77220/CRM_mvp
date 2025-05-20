import React from 'react';
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
     <header className="bg-zinc-200 border-b border-zinc-300 shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-zinc-800">MonCRM</h1>
        <nav className="space-x-6">
          <Link to="/home" className="text-zinc-700 hover:text-black font-medium">Accueil</Link>
          <Link to="/clients" className="text-zinc-700 hover:text-black font-medium">Clients</Link>
          <Link to="/coclients" className="text-zinc-700 hover:text-black font-medium">Co-Clients</Link>
          <Link to="/dossiers" className="text-zinc-700 hover:text-black font-medium">Dossiers</Link>
          <Link to="/prescribteurs" className="text-zinc-700 hover:text-black font-medium">Prescribteurs</Link>
          <Link to="/utilisateur" className="text-zinc-700 hover:text-black font-medium">Moi</Link>
          <Link to="/logout" className="text-zinc-700 hover:text-black font medium">Déconnexion</Link>
        </nav>
      </div>
    </header>
  );
};

export default HomePage;