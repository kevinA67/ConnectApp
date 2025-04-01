const MessageList = () => {
    return (
      <div className="flex flex-col p-4 space-y-4 h-96 overflow-y-auto">
        <div className="flex justify-start">
          <div className="bg-gray-200 text-black p-3 rounded-lg max-w-xs">
            Hola, ¿cómo estás?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
            ¡Todo bien! ¿Y tú?
          </div>
        </div>
        {/* Más mensajes */}
      </div>
    )
  }
  
  export default MessageList;
  