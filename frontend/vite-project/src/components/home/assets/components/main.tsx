import React from 'react';
import { Link } from 'react-router-dom';
 
const Main: React.FC = () => {
     const card = [
    {
      title: "Nouveaux clients",
      value: "3 ajoutés aujourd'hui",
      color: "bg-blue-100 text-blue-800",
      link: "/clients",
    },
    {
      title: "Dossiers du mois",
      value: "3 en cours | 4 cloturés | 1 perdu",
      color: "bg-yellow-100 text-yellow-800",
      link: "/dossiers",
    },

    {
      title: "Prescripteur à payer",
      value: "2 prescripteur en attente",
      color: "bg-red-100 text-red-800",
      link: "/prescripteurs"
    },

    {
      title: "Calendrier des tâches",
      value: "2 aujourd'hui",
      color: "bg-purple-100 text-purple-800",
      link: "/utilisateur"
    }
  ];

  return (
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-zinc-800 mb-6">Tableau de bord</h2>
        
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
    );
};

export default Main;