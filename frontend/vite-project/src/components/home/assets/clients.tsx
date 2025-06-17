import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';

type Client = {
    first_name: string;
    last_name: string;  
    email: string;
    phone_number: string;  
    country: string;
    city: string;
    project: string;
    apport: number;
}

const Clients: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Client>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        country: '',
        city: '',
        project: '',
        apport: 0
    });

    useEffect(() => {
        fetch('http://localhost:8000/clients')
            .then((res) => res.json())
            .then((data) => setClients(data));
    }, []);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "apport" ? parseFloat(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/clients/',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData),
        });
        if(response.ok){
            setClients([...clients, formData]);
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                country: '',
                city: '',
                project: '',
               apport: 0
           });
           setShowModal(false);
        }
    };

    return(
        <>
        <Header />
        <main className="p-8 bg-zinc-100 min-h-screen flex flex-col items-center">
            <section className="bg-white rounded-xl shadow-md p-8 w-full max-w-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <button 
                    className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    onClick={() => setShowModal(true)}
                    >
                        + Ajouter un client
                    </button>
                    <div className="relative w-full sm:w-72">
                        <input 
                        type="text"
                        placeholder="rechercher un client"
                        className="w-full border border-zinc-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute left-3 top-2.5 text-zinc-400">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />  
                            </svg>
                        </span>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-6">Clients</h1>
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Prénom</th>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Nom de famille</th>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Email</th>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Numéro de téléphone</th>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Pays</th>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Ville</th>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Projet</th>
                                <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">Apport</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-4 text-zinc-400">Aucun client pour le moment.</td>
                                </tr>
                            ) : (
                                clients.map((clients, idx) => (
                                    <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-4 py-2 border-b">{clients.first_name}</td>
                                        <td className="px-4 py-2 border-b">{clients.last_name}</td>
                                        <td className="px-4 py-2 border-b">{clients.email}</td>
                                        <td className="px-4 py-2 border-b">{clients.phone_number}</td>
                                        <td className="px-4 py-2 border-b">{clients.country}</td>
                                        <td className="px-4 py-2 border-b">{clients.city}</td>
                                        <td className="px-4 py-2 border-b">{clients.project}</td>
                                        <td className="px-4 py-2 border-b">{clients.apport.toFixed(2)} €</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-800 text-xl"
                            onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4">Ajouter un client</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Prénom</label>
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nom de famille</label>
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required/>  
                                </div>
                                <div>  
                                    <label className="block text-sm font-medium mb-1">Numéro de téléphone</label>
                                    <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full border rounded px-3 py-2" required/>  
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pays</label>
                                    <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border rounded px-3 py-2" required/>   
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ville</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border rounded px-3 py-2" required/> 
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Projet</label>
                                    <input type="text" name="project" value={formData.project} onChange={handleChange} className="w-full border rounded px-3 py-2" required/>   
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">apport</label>
                                    <input type="number" name="contribution" value={formData.apport} onChange={handleChange} className="w-full border rounded px-3 py-2" required min="0" step="0.01"/>   
                                </div>
                                <div className="flex justify-end gap-2">   
                                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-zinc-200 hover:bg-zinc-300">Annuler</button>
                                    <button type="submit"className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Ajouter</button>
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

export default Clients;