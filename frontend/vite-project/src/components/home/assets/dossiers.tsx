import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';

type Dossier = {
    id: number;
    type_project: string;
    amount_require: number;
    statut: string;
    customer_id: number;
    date_taken_in_charge: string;
    is_urgent?: boolean;
};

const Dossiers: React.FC = () => {
    const [dossiers, setDossiers] = useState<Dossier[]>([]);
    const [clients, setClients] = useState<{id: number, first_name: string, last_name: string}[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [sortConfig, setSortConfig] = useState<{key: keyof Dossier, direction: 'asc' | 'desc'} | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editData, setEditData] = useState<Dossier | null>(null);
    const [formData, setFormData] = useState<Dossier>({
        id: 0,
        type_project: '',
        amount_require: 0,
        statut: '',
        customer_id: 0,
        is_urgent: false,
        date_taken_in_charge: ''
    });
        
    useEffect(() => {
        fetch('http://localhost:8000/cases/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => setDossiers(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/clients/', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setClients(data);
            });
    }, [])

    const handleSort = (key: keyof Dossier) => {
        setSortConfig((prev) => {
            if (prev && prev.key === key) {
                return { key, direction: prev.direction === "desc" ? "asc" : "desc" };
            }
            return { key, direction: "desc" };
        });
    };

    const sortedDossiers = React.useMemo(() => {
        if (!sortConfig) return dossiers;
        const sorted = [...dossiers].sort((a, b) => {
            const key = sortConfig.key;
            if (key === 'is_urgent') {
                if(sortConfig.direction === 'asc') {
                    return (b.is_urgent ? 1 : 0) - (a.is_urgent ? 1 : 0);
                } else {
                    return (a.is_urgent ? 1 : 0) - (b.is_urgent ? 1 : 0);
                }
            }
            if (key === 'statut') {
                const statutOrderAsc = ['En cours', 'En attente', 'Terminé'];
                const statutOrderDesc = ['En attente', 'En cours', 'Terminé'];
                const order = sortConfig.direction === 'asc' ? statutOrderAsc : statutOrderDesc;
                return order.indexOf(a.statut) - order.indexOf(b.statut);
            }
            if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                return sortConfig.direction === 'asc'
                    ? (a[key] as number) - (b[key] as number)
                    : (b[key] as number) - (a[key] as number);
            }
            const aVal = String(a[key] ?? '').toLowerCase();
            const bVal = String(b[key] ?? '').toLowerCase();
            return sortConfig.direction === 'asc'
                ? aVal.localeCompare(bVal, 'fr', {sensitivity: 'base'})
                : bVal.localeCompare(aVal, 'fr', {sensitivity: 'base'});
        });
        return sorted;
    }, [dossiers, sortConfig]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : type === 'number'
                    ? value === '' ? 0 : parseFloat(value)
                    : value
        });
    };
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        let dateISO = '';
         if (formData.date_taken_in_charge) {
            const [jour, mois, annee] = formData.date_taken_in_charge.split('/');
            if (
                jour?.length === 2 &&
                mois?.length === 2 &&
                annee?.length === 4 &&
                !isNaN(Number(jour)) &&
                !isNaN(Number(mois)) &&
                !isNaN(Number(annee))
            ) {
                dateISO = `${annee}-${mois}-${jour}`;
            } else {
                alert('Format de date invalide. Utilisez JJ/MM/AAAA.');
                return;
        }
    }
    const dataToSend = {
        ...formData,
        date_taken_in_charge: dateISO 
    };
        const response = await fetch('http://localhost:8000/cases/', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(dataToSend)
        });
        if (response.ok){
            const newDossier = await response.json();
            setDossiers([...dossiers, newDossier]);
            setFormData({
                id: 0,
                type_project: '',
                amount_require: 0,
                statut: '',
                customer_id: 0,
                is_urgent: false,
                date_taken_in_charge: ''
            });
            setShowModal(false);
        }
    };  
    

   return (
    <>
        <Header />
        <main className="p-8 bg-zinc-100 min-h-screen flex flex-col items-center">
            <section className="bg-white rounded-xl shadow-md p-8 w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dossiers</h1>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        + Ajouter un dossier
                    </button>
                </div>
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th
                                    className="px-4 py-2 border-b cursor-pointer"
                                    onClick={() => handleSort('type_project')}
                                >
                                    Type de projet
                                </th>
                                <th
                                    className="px-4 py-2 border-b cursor-pointer"
                                    onClick={() => handleSort('amount_require')}
                                >
                                    Montant demandé
                                </th>
                                <th
                                    className="px-4 py-2 border-b cursor-pointer"
                                    onClick={() => handleSort('statut')}
                                >
                                    Statut
                                </th>
                                <th
                                    className="px-4 py-2 border-b cursor-pointer"
                                    onClick={() => handleSort('date_taken_in_charge')}
                                >
                                    Date prise en charge
                                </th>
                                <th
                                    className="px-4 py-2 border-b cursor-pointer"
                                    onClick={() => handleSort('is_urgent')}
                                >
                                    Urgent
                                </th>
                                <th
                                    className="px-4 py-2 border-b cursor-pointer"
                                    onClick={() => handleSort('customer_id')}
                                >
                                    Client
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedDossiers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-zinc-400">
                                        Aucun dossier pour le moment.
                                    </td>
                                </tr>
                            ) : (
                                sortedDossiers.map((dossier, idx) => (
                                    <tr 
                                    key={idx} 
                                    className="hover:bg-zinc-50 transition-colors"
                                    onClick={() => setSelectedDossier(dossier)}
                                    >
                                        <td className="px-4 py-2 border-b">{dossier.type_project}</td>
                                        <td className="px-4 py-2 border-b">{dossier.amount_require.toLocaleString()} €</td>
                                        <td className="px-4 py-2 border-b">{dossier.statut}</td>
                                        <td className="px-4 py-2 border-b">{dossier.date_taken_in_charge ? new Date(dossier.date_taken_in_charge).toLocaleDateString('fr-FR') : ''}</td>
                                        <td className="px-4 py-2 border-b">{dossier.is_urgent ? "Oui" : "Non"}</td>
                                       <td className="px-4 py-2 border-b">
                                            {clients.find(c => c.id === dossier.customer_id)
                                                ? `${clients.find(c => c.id === dossier.customer_id)!.first_name} ${clients.find(c => c.id === dossier.customer_id)!.last_name}`
                                                : dossier.customer_id}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Ajouter un dossier</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Type de projet
                                </label>
                                <input
                                    type="text"
                                    name="type_project"
                                    value={formData.type_project}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Montant demandé
                                </label>
                                <input
                                    type="number"
                                    name="amount_require"
                                    value={formData.amount_require || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Statut
                                </label>
                                <select
                                    name="statut"
                                    value={formData.statut}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Sélectionnez un statut</option>
                                    <option value="En attente">En attente</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Terminé">Terminé</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Client
                                </label>
                                <select
                                    name="customer_id"
                                    value={formData.customer_id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Sélectionnez un client</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>
                                            {client.first_name} {client.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Date prise en charge
                                </label>
                                <input
                                    type="text"
                                    name="date_taken_in_charge"
                                    value={formData.date_taken_in_charge}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder='JJ/MM/AAAA'
                                    pattern="\d{2}/\d{2}/\d{4}"
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_urgent"
                                    checked={formData.is_urgent}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label className="text-sm font-medium">
                                    Urgent
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedDossier && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Détails du dossier</h2>
                            <button
                                onClick={() => setSelectedDossier(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div><b>Type de projet :</b> {selectedDossier.type_project}</div>
                            <div><b>Montant demandé :</b> {selectedDossier.amount_require} €</div>
                            <div><b>Statut :</b> {selectedDossier.statut}</div>
                            <div><b>Date prise en charge :</b> {selectedDossier.date_taken_in_charge ? new Date(selectedDossier.date_taken_in_charge).toLocaleDateString('fr-FR') : ''}</div>
                            <div><b>Urgent :</b> {selectedDossier.is_urgent ? "Oui" : "Non"}</div>
                            <div>
                                <b>Client :</b> {
                                    clients.find(c => c.id === selectedDossier.customer_id)
                                    ? `${clients.find(c => c.id === selectedDossier.customer_id)!.first_name} ${clients.find(c => c.id === selectedDossier.customer_id)!.last_name}`
                                    : selectedDossier.customer_id
                                }
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => {
                                    setEditData(selectedDossier);
                                    setShowEditForm(true);
                                    setSelectedDossier(null);
                                }}
                            >
                                Modifier
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                onClick={() => {
                                    setShowDeleteConfirm(true);
                                    // garde selectedDossier pour la suppression
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
                )}
            {showEditForm && editData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Modifier le dossier</h2>
                            <button
                                onClick={() => setShowEditForm(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                // Conversion JJ/MM/AAAA → YYYY-MM-DD
                                let dateISO = '';
                                if (editData.date_taken_in_charge) {
                                    const [jour, mois, annee] = editData.date_taken_in_charge.split('/');
                                    if (
                                        jour?.length === 2 &&
                                        mois?.length === 2 &&
                                        annee?.length === 4 &&
                                        !isNaN(Number(jour)) &&
                                        !isNaN(Number(mois)) &&
                                        !isNaN(Number(annee))
                                    ) {
                                        dateISO = `${annee}-${mois}-${jour}`;
                                    } else {
                                        alert('Format de date invalide. Utilisez JJ/MM/AAAA.');
                                        return;
                                    }
                                }
                                const response = await fetch(`http://localhost:8000/cases/${editData.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + localStorage.getItem("token"),
                                    },
                                    body: JSON.stringify({
                                        ...editData,
                                        date_taken_in_charge: dateISO,
                                    }),
                                });
                                if (response.ok) {
                                    const updated = await response.json();
                                    setDossiers(dossiers.map(d => d.id === updated.id ? updated : d));
                                    setShowEditForm(false);
                                    setEditData(null);
                                } else {
                                    alert("Erreur lors de la modification");
                                }
                            }}
                            className="space-y-4"
                            >
                            <div>
                                <label className="block text-sm font-medium mb-1">Type de projet</label>
                                <input
                                    type="text"
                                    name="type_project"
                                    value={editData.type_project}
                                    onChange={e => setEditData({...editData, type_project: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Montant demandé</label>
                                <input
                                    type="number"
                                    name="amount_require"
                                    value={editData.amount_require}
                                    onChange={e => setEditData({...editData, amount_require: parseFloat(e.target.value) || 0})}
                                    className="w-full px-3 py-2 border rounded-md"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Statut</label>
                                <select
                                    name="statut"
                                    value={editData.statut}
                                    onChange={e => setEditData({...editData, statut: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Sélectionnez un statut</option>
                                    <option value="En attente">En attente</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Terminé">Terminé</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Client</label>
                                <select
                                    name="customer_id"
                                    value={editData.customer_id}
                                    onChange={e => setEditData({...editData, customer_id: Number(e.target.value)})}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Sélectionnez un client</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>
                                            {client.first_name} {client.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date prise en charge</label>
                                    <input
                                        type="text"
                                        name="date_taken_in_charge"
                                        value={editData.date_taken_in_charge}
                                        onChange={e => setEditData({...editData, date_taken_in_charge: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="JJ/MM/AAAA"
                                        pattern="\d{2}/\d{2}/\d{4}"
                                        required
                                    />
                            </div>
                            <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_urgent"
                                        checked={!!editData.is_urgent}
                                        onChange={e => setEditData({...editData, is_urgent: e.target.checked})}
                                        className="mr-2"
                                    />
                                <label className="text-sm font-medium">Urgent</label>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditForm(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDeleteConfirm && selectedDossier && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-60">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce dossier ?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-zinc-200 hover:bg-zinc-300"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Fermer
                            </button>
                            <button
                                onClick={async () => {
                                    if(!selectedDossier?.id) return;
                                    const response = await fetch(`http://localhost:8000/cases/${selectedDossier.id}`,{
                                        method: "DELETE",
                                        headers: {
                                            "Authorization": "Bearer " + localStorage.getItem("token"),
                                        },
                                    });
                                    if (response.ok){
                                        setDossiers(dossiers.filter((d) => d.id !== selectedDossier.id));
                                        setShowDeleteConfirm(false);
                                        setSelectedDossier(null);
                                    } else {
                                        alert('Erreur lors de la suppression');
                                    }
                                }}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
        <Footer />
    </>
);
}
export default Dossiers;