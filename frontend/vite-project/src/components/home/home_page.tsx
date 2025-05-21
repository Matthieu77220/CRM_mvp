import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  // Les données des cartes affichées dans le tableau de bord
  const card = [
    {
      title: "Nouveaux clients",
      value: "3 ajoutés aujourd'hui",
      color: "bg-blue-100 text-blue-800",
      link: "/clients",
    },
    {
      title: "Dossiers en attente",
      value: "5 à traiter",
      color: "bg-yellow-100 text-yellow-800",
      link: "/dossiers",
    },
    {
      title: "Co-clients à valider",
      value: "2 en attente",
      color: "bg-red-100 text-red-800",
      link: "/coclients",
    },
    {
      title: "Tâches urgentes",
      value: "1 aujourd'hui",
      color: "bg-purple-100 text-purple-800",
      link: "/utilisateur"
    }
  ];

  return (
    <>
      {/* Header de navigation */}
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
            <Link to="/" className="text-zinc-700 hover:text-black font-medium">Déconnexion</Link>
          </nav>
        </div>
      </header>

      {/* Section principale avec les cartes */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-zinc-800 mb-6">Tableau de bord</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {card.map((cardItem, index) => (
            <Link to={cardItem.link} key={index} className="block">
              <div className={`rounded-lg p-4 shadow hover:shadow-lg transition ${cardItem.color}`}>
                <h3 className="text-lg font-semibold mb-2">{cardItem.title}</h3>
                <p className="text-sm">{cardItem.value}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
