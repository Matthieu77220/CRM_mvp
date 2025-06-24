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

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    login?: string;
    // Ajoute d'autres champs si besoin
};

const Utilisateur: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditdata] = useState<User | null>(null);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')

    useEffect(() => {
        fetch('http://localhost:8000/messages/received', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => setMessages(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/users/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => setUser(data));
    }, []);

    return (
    <>
        <Header />
        <main className="bg-zinc-100 min-h-screen flex flex-col items-center py-8">
            <section className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
                {/* Partie profil à gauche */}
                <div className="bg-white rounded-xl shadow-md p-8 flex-1 flex flex-col items-center">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-violet-500 flex items-center justify-center mb-4">
                        <svg width="48" height="48" fill="white" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="4" />
                            <ellipse cx="12" cy="17" rx="7" ry="5" />
                        </svg>
                    </div>
                    {/* Nom et email */}
                    <h2 className="text-2xl font-bold mb-1">
                        {user ? `${user.first_name} ${user.last_name}` : '...'}
                    </h2>
                    <div className="text-zinc-500 mb-1">
                        {user ? user.email : '...'}
                    </div>
                    <div className="text-zinc-500 mb-1">
                        {user ? user.phone_number : '...'}
                    </div>
                    <div className="text-zinc-500 mb-1">
                        {user ? user.login : '...'}
                    </div>
                    {/* Bouton modifier */}
                    <button 
                        className="bg-zinc-200 px-4 py-2 rounded mb-6 hover:bg-zinc-300 transition"
                        onClick={() => {
                            setEditdata(user);
                            setEditOpen(true)
                        }}
                    >
                        Modifier le profil
                    </button>
                </div>
                {/* Partie messages à droite */}
                <div className="bg-white rounded-xl shadow-md p-8 flex-1">
                    <h3 className="text-lg font-bold mb-4">Notifications</h3>
                    <div className="mb-2">
                        <span className="font-semibold">Messages reçus</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <label htmlFor="sortOrder" className="text-sm">Trier par&nbsp;:</label>
                        <select
                            id="sortOrder"
                            className="border rounded px-2 py-1 text-sm"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
                        >
                            <option value="desc">Plus récents d'abord</option>
                            <option value="asc">Plus anciens d'abord</option>
                        </select>
                    </div>
                    <ul className="space-y-2">
                        {messages.length === 0 ? (
                            <li className="text-zinc-400">Aucun message reçu.</li>
                        ) : (
                            messages
                                .slice()
                                .sort((a, b) =>
                                    sortOrder === 'desc'
                                        ? new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
                                        : new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
                                )
                                .map(msg => (
                                    <li key={msg.id} className="flex items-center gap-2">
                                        <span className="bg-zinc-100 p-2 rounded-full">
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <rect x="3" y="7" width="18" height="10" rx="2" fill="#e5e7eb" />
                                                <path d="M3 7l9 6 9-6" stroke="#6366f1" />
                                            </svg>
                                        </span>
                                        <div className="flex-1">
                                            <div className="font-medium">{msg.sender_name} - {msg.content}</div>
                                            <div className="text-xs text-zinc-400">{new Date(msg.sent_at).toLocaleString()}</div>
                                        </div>
                                        <button
                                            className="ml-2 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition"
                                            onClick={() => setSelectedMessage(msg)}
                                            title="voir les détails"
                                        >
                                            Détails
                                        </button>
                                        <button
                                            className="ml-2 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
                                            onClick={() => setMessageToDelete(msg)}
                                        >
                                            Supprimer
                                        </button>
                                    </li>
                                ))
                        )}
                    </ul>
                </div>
            </section>
            {/* Pop-up détails message */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
                        <button
                            className="absolute top-2 right-2 tex-zinc-500 hover:text-zinc-800 text-xl"
                            onClick={() => setSelectedMessage(null)}
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4"> Détails du message</h3>
                        <div className="mb-2"><b>Nom :</b> {selectedMessage.sender_name}</div>
                        <div className="mb-2"><b>Email :</b> {selectedMessage.sender_email}</div>
                        <div className="mb-2"><b>Message :</b> {selectedMessage.content}</div>
                        <div className="mb-2"><b>Reçu le :</b> {new Date(selectedMessage.sent_at).toLocaleString()}</div>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => setSelectedMessage(null)}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
            {/* Pop-up confirmation suppression */}
            {messageToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-60">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce message&nbsp; ?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-zinc-200 hover:bg-zinc-300"
                                onClick={() => setMessageToDelete(null)}
                            >
                                Annuler
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                onClick={async () => {
                                    if (!messageToDelete) return;
                                    await fetch(`http://localhost:8000/messages/${messageToDelete.id}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Authorization": "Bearer " + localStorage.getItem('token')
                                        },
                                    });
                                    setMessages(messages.filter(m => m.id !== messageToDelete.id));
                                    setMessageToDelete(null)
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pop-up modification profil */}
            {editOpen && editData && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
                        <button
                            className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-800 text-xl"
                            onClick={() => setEditOpen(false)}
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">Modifier mon profil</h3>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const res = await fetch(`http://localhost:8000/users/${user?.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + localStorage.getItem("token"),
                                    },
                                    body: JSON.stringify(editData),
                                });
                                if (res.ok) {
                                    const updated = await res.json();
                                    setUser(updated);
                                    setEditOpen(false);
                                } else {
                                    alert("Erreur lors de la modification");
                                }
                            }}
                            className="flex flex-col gap-3"
                        >
                            <input
                                className="border rounded px-2 py-1"
                                value={editData.first_name}
                                onChange={e => setEditdata({ ...editData, first_name: e.target.value })}
                                placeholder="Prénom"
                                required
                            />
                            <input
                                className="border rounded px-2 py-1"
                                value={editData.last_name}
                                onChange={e => setEditdata({ ...editData, last_name: e.target.value })}
                                placeholder="Nom"
                                required
                            />
                            <input
                                className="border rounded px-2 py-1"
                                value={editData.email}
                                onChange={e => setEditdata({ ...editData, email: e.target.value })}
                                placeholder="Email"
                                required
                            />
                            <input
                                className="border rounded px-2 py-1"
                                value={editData.phone_number}
                                onChange={e => setEditdata({ ...editData, phone_number: e.target.value })}
                                placeholder="Téléphone"
                                required
                            />
                            <input
                                className="border rounded px-2 py-1"
                                value={editData.login}
                                onChange={e => setEditdata({ ...editData, login: e.target.value })}
                                placeholder="Login"
                                required
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-zinc-200 hover:bg-zinc-300"
                                    onClick={() => setEditOpen(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </main>
        <Footer />
    </>
);
};

export default Utilisateur;