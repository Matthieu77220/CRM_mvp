import React from 'react';
import ProfileImage from './../img/blank_pp.png';

const Aside: React.FC = () => {
    return(
        <aside className="p-4 bg-zinc-100 border-b border-zinc-300 text-center">
        <img src={ProfileImage} alt="Photo de profil" className="rounded-full w-24 h-24 mx-auto mb-4"></img>
        <h1 className="font-bold text-lg"> Bienvenu Stéphanie </h1>
        <p className="text-sm text-zinc-600">Courtière</p>
      </aside>
    );
};

export default Aside;