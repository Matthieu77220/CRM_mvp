import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">Prénom :</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Jean"
        />
      </div>

      <div>
        <label htmlFor="last_name">Nom :</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Dupont"
        />
      </div>

      <div>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="exemple@email.com"
        />
      </div>

      <div>
        <label htmlFor="login">Login :</label>
        <input
          type="text"
          name="login"
          value={formData.login}
          onChange={handleChange}
          placeholder="jean.dupont"
        />
      </div>

      <div>
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe sécurisé"
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit">Créer mon compte</button>
    </form>
  );
};

export default RegisterForm;
