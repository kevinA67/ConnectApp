"use client";

import React, { ChangeEvent, use, useEffect, useState } from "react";
import Image from "next/image";
import socket from "../utils/socket";
import { User } from "../types";
import { useRouter } from 'next/navigation'


const page = () => {
  const [user, setUser] = useState<User>({email: "", name: "", password: ""});
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

useEffect(() => {
  socket.on("register_response", (data) => {
    if(data.status === "success") {
      router.push(`/?uid=${data.uid}&name=${data.name}`);
      sessionStorage.setItem('token', data.id_token);
    }else if(data.status === "error") {
      setError(data.message);
    }
  });

  socket.on("login_response", (data) => {
    if(data.status === "success") {
      router.push(`/?uid=${data.uid}&name=${data.name}`);
      sessionStorage.setItem('token', data.id_token);
    }else if(data.status === "error") {
      setError(data.message);
    }
  });
  return () => {
    socket.off("register_response");
    socket.off("login_response");
  };
}, []);
  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRegistering) {
      if(!user.email || !user.name || !user.password) {
        setError("Por favor, completa todos los campos.");
        return;
      }
      if (!emailRegex.test(user.email)) {
        setError("El correo electrónico no es válido.");
        return;
      }
      if (user.password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      socket.emit("register",user);

    } else {
      if(!user.email || !user.password) {
        setError("Por favor, completa todos los campos.");
        return;
      }
      if (!emailRegex.test(user.email)) {
        setError("El correo electrónico no es válido.");
        return;
      }

      socket.emit("login",user);
    }
  };

  const validateForm = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  const handleForm = () => {
    setIsRegistering(!isRegistering)
    setError('');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-96 p-6 shadow-xl rounded-2xl bg-gray-800">
        <div className="flex flex-col items-center">
          <Image
            src="/logo-chat2.png"
            alt="ConnectApp Logo"
            width={100}
            height={100}
          />
          <h2 className="text-2xl font-bold mt-4">ConnectApp</h2>
        </div>
        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={validateForm}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />

          {isRegistering && (
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={user.name}
              onChange={validateForm}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          )}
         
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={validateForm}
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            {isRegistering ? "Registrarse" : "Iniciar sesión"}
          </button>
          
          {
            error && <span className="text-red-500 text-sm mt-1 block text-center">{error}</span>
          }
        
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            {isRegistering
              ? "¿Ya tienes una cuenta?"
              : "¿No tienes una cuenta?"}
            <button
              onClick={handleForm}
              className="text-blue-400 hover:underline ml-1"
            >
              {isRegistering ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
