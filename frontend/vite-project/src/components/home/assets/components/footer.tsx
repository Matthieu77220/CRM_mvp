import React from 'react';
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
    return(
        <footer className="bg-zinc-200 border-b border-zinc-300 shadow-md p-4 absolute bottom-0 left-0 right-0">
                  <p className="justify-center text-center">&copy;2025</p>
                  
                  <div className="justify-center text-center">
                    <Link to="/contact" className="text-zinc-700 hover:text-black font-medium ">Assistance</Link>
                  </div>
              </footer>
    );
};

export default Footer;