import React, { useState, lazy, Suspense } from 'react';
import { Theme } from 'emoji-picker-react';

const EmojiPicker = lazy(() => import('emoji-picker-react'));

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData: any) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false); // cerrar después de elegir
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('Mensaje enviado:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-900 relative">
      <div className="flex items-center">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-gray-700 text-white px-3 rounded-l-lg"
        >
          😀
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-700 text-white p-3 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-3 rounded-r-lg"
        >
          Enviar
        </button>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <Suspense fallback={<div className="text-white">Cargando emojis...</div>}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
