"use client";

import { Suspense } from "react"; // Importa Suspense
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { useSearchParams } from "next/navigation";
import socket from "./utils/socket";
import { useEffect, useState } from "react";
import { Contacts, Messages } from "./types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Spinner from "./components/Spinner";

const Home = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [user, setUser] = useState<Contacts>({
    uid: "",
    email: "",
    displayName: searchParams.get("name") ?? "",
  });
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [contactSelected, setContactSelected] = useState<Contacts | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    socket.emit("verify_token", { token: sessionStorage.getItem("token") });

    socket.on("obtener_usuarios_response", (data) => {
      if (data.status === "success") {
        setContacts(data.usuarios);
      } else if (data.status === "error") {
        console.log("Error", data.message);
      }
    });

    socket.on("verify_response", (data) => {
      if (data.status === "success") {
        socket.emit("obtener_usuarios", data.user.uid);
        setUser(data.user);
        setLoading(false);
      } else if (data.status === "error") {
        router.push("/login");
        sessionStorage.removeItem("token");
      }
    });

    socket.on("message_response", (data) => {
      if (data !== null) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    socket.on("obtener_mensajes_respuesta", (data) => {
      setMessages(data.mensajes);
    });

    return () => {
      socket.off("verify_response");
      socket.off("message_response");
      socket.off("obtener_usuarios_response");
      socket.off("obtener_mensajes_respuesta");
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        name={user.displayName ?? ""}
        contacts={contacts}
        setContactSelected={setContactSelected}
        user={user.email}
      />
      <div className="flex flex-col w-2/3 bg-gray-800">
        {contactSelected !== null ? (
          <>
            <ChatHeader contact={contactSelected} />
            <div className="flex-1 overflow-auto">
              <MessageList messages={messages} user={user.email} />
            </div>
            <MessageInput
              contact={contactSelected}
              user={user.email}
              setMessages={setMessages}
              messages={messages}
            />
          </>
        ) : (
          <div className="flex justify-center items-center flex-1 flex-col">
            <Image
              className="shadow-lg shadow-blue-500/50 rounded-full"
              src="/logo-chat2.png"
              alt="ConnectApp Logo"
              width={300}
              height={300}
            />
            <span className="text-2xl font-bold mt-4 text-amber-50">
              ConnectApp
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Home />
  </Suspense>
);

export default SuspenseWrapper;
