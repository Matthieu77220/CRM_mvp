import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';

type Message = {
    id: number;
    sender_name: string;
    sender_email: string;
    content: string;
    sent_at: string;
    read: boolean;
};

const Utilisateur: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() =>{
        fetch('http://localhost:8000/messages/received', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => setMessages(data))
    }, [])
    
    return(
        <>
         <Header />
         <main className="bg-zinc-100 min-h-screen flex flex-col items-center py-8">
            <section className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
                <div className="bg-white rounded-xl shadow-md p-8 flex-1">
                    <div className="bg-white rounded-xl shadow-md p-8 flex-1 flex flex-col items-center">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-violet-500 flex items-center justify-center mb-4">
                            <svg width="48" height="48" fill="white" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="4"/>
                                <ellipse cx="12" cy="17" rx="7" ry="5"/>
                            </svg>
                        </div>
                        {/* Nom et email */}
                        <h2 className="text-2xl font-bold mb-1">Jean Dupont</h2>
                        <div className="text-zinc-500 mb-1">jean.dupont@example.com</div>
                        <div className="text-zinc-600 text-sm mb-4">Responsable commercial</div>
                        {/* Dates */}
                        <div className="text-zinc-400 text-xs mb-2">Créé le: 12/03/2020</div>
                        <div className="text-zinc-400 text-xs mb-4">Dernière connexion: 24/04/2024</div>
                        {/* Bouton modifier */}
                        <button className="bg-zinc-200 px-4 py-2 rounded mb-6 hover:bg-zinc-300 transition">Modifier le profil</button>
                        {/* Statistiques */}
                        <div className="flex gap-4 w-full justify-center">
                            <div className="bg-zinc-100 rounded p-3 flex flex-col items-center min-w-[80px]">
                                <div className="font-bold text-lg">45</div>
                                <div className="text-xs text-zinc-500">Dossiers</div>
                            </div>
                            <div className="bg-zinc-100 rounded p-3 flex flex-col items-center min-w-[80px]">
                                <div className="font-bold text-lg">12</div>
                                <div className="text-xs text-zinc-500">Co-Clients</div>
                            </div>
                            <div className="bg-zinc-100 rounded p-3 flex flex-col items-center min-w-[80px]">
                                <div className="font-bold text-lg">78 %</div>
                                <div className="text-xs text-zinc-500">Tx de réponse</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Notifications */}
                        <div className="bg-white rounded-xl shadow-md p-6 mb-4">
                            <h3 className="text-lg font-bold mb-4">Notifications</h3>
                            <div className="mb-2">
                                <span className="font-semibold">Messages reçus</span>
                            </div>
                            <ul className="space-y-2">
                                {messages.length === 0 ? (
                                    <li className="text-zinc-400">Aucun message reçu.</li>
                                ) : (
                                    messages.map(msg => (
                                        <li key={msg.id} className="flex items-center gap-2">
                                            <span className="bg-zinc-100 p-2 rounded-full">
                                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <rect x="3" y="7" width="18" height="10" rx="2" fill="#e5e7eb"/>
                                                    <path d="M3 7l9 6 9-6" stroke="#6366f1"/>
                                                </svg>
                                            </span>
                                            <div>
                                                <div className="font-medium">{msg.sender_name} - {msg.content}</div>
                                                <div className="text-xs text-zinc-400">{new Date(msg.sent_at).toLocaleString()}</div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                        {/* Activité */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-bold mb-4">Activité</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-600">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </span>
                                    <span>Dossier XYZ mis à jour</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-600">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </span>
                                    <span>Message envoyé à Client Martin</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
         </main>
         <Footer />
        </>
    );
};

export default Utilisateur;