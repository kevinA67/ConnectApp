const ChatHeader = ({ name }: { name: string }) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold text-lg leading-none">
          J
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
      <div className="space-x-4">
        <button className="text-xl">⋮</button>
      </div>
    </div>
  );
};

export default ChatHeader;
