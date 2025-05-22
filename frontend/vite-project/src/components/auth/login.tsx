import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('Connexion réussie !');

    // Simule un login
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center text-zinc-800">Connexion</h2>

        <div>
          <label htmlFor="login" className="block text-sm font-medium text-zinc-700 mb-1">Login</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="votre identifiant"
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe sécurisé"
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Se connecter
        </button>

        <div>
            <Link to="/"className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition">S'inscrire</Link>
        </div>

      </form>
    </div>
  );
};

export default Login;
