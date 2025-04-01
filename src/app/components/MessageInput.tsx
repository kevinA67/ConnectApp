const MessageInput = () => {
    return (
      <div className="flex p-4 bg-gray-900">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg outline-none"
        />
        <button className="bg-blue-500 text-white p-3 rounded-r-lg">
          Enviar
        </button>
      </div>
    )
  }
  
  export default MessageInput;
  