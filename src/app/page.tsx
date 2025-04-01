import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

const Home = () => {
  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar />
    <div className="flex flex-col w-2/3 bg-gray-800">
      {/* Encabezado */}
      <ChatHeader name="Juan" />
      {/* Mensajes (ocupa el espacio disponible) */}
      <div className="flex-1 overflow-auto">
        <MessageList />
      </div>
      {/* Envío de mensajes (fijo abajo) */}
      <MessageInput />
    </div>
  </div>
  );
};

export default Home;
