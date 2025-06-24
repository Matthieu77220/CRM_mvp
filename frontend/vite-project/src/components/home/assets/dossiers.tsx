import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';

type Dossier = {
    id: number;
    type_project: string;
    amount_require: number;
    statut: string;
    customer_id: number;
    date_taken_in_charge?: string;
    is_urgent?: boolean;
};

const Dossiers: React.FC = () => {
    const [dossiers, setDossiers] = useState<Dossier[]>([]);
    const [sortConfig, setSortConfig] = useState<{key: keyof Dossier, direction: 'asc' | 'desc'} | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/cases/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => setDossiers(data));
    }, []);

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

    return (
        <>
            <Header />
            <main className="p-8 bg-zinc-100 min-h-screen flex flex-col items-center">
                <section className="bg-white rounded-xl shadow-md p-8 w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6">Dossiers</h1>
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b cursor-pointer"
                                        onClick={() => handleSort("type_project")}>
                                        Type de projet {sortConfig?.key === "type_project" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b cursor-pointer"
                                        onClick={() => handleSort("amount_require")}>
                                        Montant demandé {sortConfig?.key === "amount_require" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b cursor-pointer"
                                        onClick={() => handleSort("statut")}>
                                        Statut {sortConfig?.key === "statut" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b cursor-pointer"
                                        onClick={() => handleSort("date_taken_in_charge")}>
                                        Prise en charge {sortConfig?.key === "date_taken_in_charge" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">
                                        Urgent
                                    </th>
                                    <th className="px-4 py-2 text-left font-semibold text-zinc-700 border-b">
                                        Client (ID)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedDossiers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-zinc-400">Aucun dossier pour le moment.</td>
                                    </tr>
                                ) : (
                                    sortedDossiers.map((dossier, idx) => (
                                        <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-4 py-2 border-b">{dossier.type_project}</td>
                                            <td className="px-4 py-2 border-b">{dossier.amount_require.toLocaleString()} €</td>
                                            <td className="px-4 py-2 border-b">{dossier.statut}</td>
                                            <td className="px-4 py-2 border-b">{dossier.date_taken_in_charge ? new Date(dossier.date_taken_in_charge).toLocaleDateString() : ''}</td>
                                            <td className="px-4 py-2 border-b">{dossier.is_urgent ? "Oui" : "Non"}</td>
                                            <td className="px-4 py-2 border-b">{dossier.customer_id}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Dossiers;