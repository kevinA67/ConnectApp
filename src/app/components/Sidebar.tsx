"use client";

import { useState } from "react";
import { Contacts } from "../types";
import socket from "../utils/socket";
import { useRouter } from "next/navigation";

type SidebarProps = {
  name: string;
  contacts: Contacts[];
  setContactSelected: (contact: Contacts) => void;
  user: string;
};

const Sidebar = ({
  name,
  contacts,
  setContactSelected,
  user,
}: SidebarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [active, setActive] = useState(false);
  const router = useRouter();

  const handleContactClick = (contact: Contacts) => {
    setContactSelected(contact);
    socket.emit("obtener_mensajes", {
      clave1: `${contact.email}-${user}`,
      clave2: `${user}-${contact.email}`,
    });
  };

  const handleClose = () => {
    setActive(true);
    sessionStorage.removeItem("token");
    socket.emit("logout");
    router.push("/login");
  };

  return (
    <div className="w-1/3 bg-gray-800 text-white p-4 border-r-1">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg leading-none">
          {name.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-xl font-semibold">{name}</h2>
        {/* Contenedor del menú con position relative */}
        <div className="relative ml-auto">
          <button className="text-xl cursor-pointer" onClick={toggleMenu}>
            ⋮
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-blue-900 shadow-lg rounded-md border">
              <button
                className="w-full text-left px-4 py-2 text-white-500 hover:bg-blue-700 rounded-md"
                onClick={handleClose}
                disabled={active}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.uid}
            className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer border-t-1 border-b-1"
            onClick={() => handleContactClick(contact)}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold text-lg leading-none">
              {contact.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="font-semibold">{contact.displayName}</p>
              {/* <p className="text-gray-400">Hola, ¿cómo estás?</p> */}
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 ml-auto"></div>{" "}
            {/* Indicador en línea */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
