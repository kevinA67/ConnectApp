"use client";

import React, { use, useState } from 'react';
import Image from 'next/image';
import socket from '../utils/socket';

const page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = () => {
    if (isRegistering) {
      console.log('Registering with:', email, password);
    } else {
      console.log('Logging in with:', email, password);
    }
  };


  const handlePrueba = (e: any) => {
    e.preventDefault();
    socket.emit("login", "Hola");
    console.log("Holaa", )
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-96 p-6 shadow-xl rounded-2xl bg-gray-800">
        <div className="flex flex-col items-center">
          <Image src="/logo-chat2.png" alt="ConnectApp Logo" width={100} height={100} />
          <h2 className="text-2xl font-bold mt-4">ConnectApp</h2>
        </div>
        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
            <button
              // onClick={() => setIsRegistering(!isRegistering)}
              onClick={handlePrueba}
              className="text-blue-400 hover:underline ml-1"
            >
              {isRegistering ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;