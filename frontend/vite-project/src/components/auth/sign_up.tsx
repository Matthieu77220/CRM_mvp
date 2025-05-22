import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate(); //

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    login: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string): boolean => {
    const isLongEnough = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return isLongEnough && hasUppercase && hasDigit && hasSpecialChar;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const { first_name, last_name, email, login, password } = formData;

    // Validation simple
    if (!first_name || !last_name || !email || !login || !password) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Le mot de passe doit contenir au moins 12 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.');
      return;
    }

    // Simule un envoi (ex. axios.post)
    console.log('Formulaire envoyé :', formData);
    setSuccessMessage('Compte créé avec succès !');
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      login: '',
      password: '',
    });

    // Redirection après 1 seconde vers la route '/home'
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center">

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">

        <h2 className="text-2xl font-bold text-center text-zinc-800">Inscirption</h2>

        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-zinc-700 mb-1">Prénom :</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Jean"
            className="w-full px-4 border border-zinc-300 rounded-md foucs:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-zinc-700 mb-1">Nom :</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Dupont"
            className="w-full px-4 border-zinc-300 rounded-md focus:outline-none foucs:ring-2 focus:ring-blue-500"
          /> 
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@email.com"
            className="w-full px-4 border-zinc-300 rounded-md focus:outline-none foucs:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="login" className="block text-sm font-medium text-zinc-700 mb-1">Login :</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="jean.dupont"
            className="w-full px-4 border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1">Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe sécurisé"
            className="w-full px-4 border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition">Créer mon compte</button>

        <div>
          <Link to="/login" className=" w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition">Se connecter</Link>
        </div>

      </form>

    </div>
  );
};

export default RegisterForm;
