"use client";

import { useState } from "react";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-1/3 bg-gray-800 text-white p-4 border-r-1">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg leading-none">
          A
        </div>

        <h2 className="text-xl font-semibold">Alexis</h2>
        {/* Contenedor del menú con position relative */}
      <div className="relative ml-auto">
        <button className="text-xl cursor-pointer" onClick={toggleMenu}>
          ⋮
        </button>

        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-blue-900 shadow-lg rounded-md border">
            <button className="w-full text-left px-4 py-2 text-white-500 hover:bg-blue-700 rounded-md">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer border-t-1 border-b-1">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold text-lg leading-none">
            C
          </div>
          <div className="text-sm">
            <p className="font-semibold">Claudia</p>
            <p className="text-gray-400">Hola, ¿cómo estás?</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-green-500 ml-auto"></div>{" "}
          {/* Indicador en línea */}
        </div>

        <div className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer border-t-1 border-b-1">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold text-lg leading-none">
            O
          </div>
          <div className="text-sm">
            <p className="font-semibold">Oscar</p>
            <p className="text-gray-400">Hola, ¿cómo estás?</p>
          </div>
          <div className="w-3 h-3 rounded-full bg-red-500 ml-auto"></div>{" "}
          {/* Indicador en línea */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
