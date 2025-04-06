import { Contacts } from "../types";

type ChatHeaderProps = {
  contact: Contacts | null;
}

const ChatHeader = ({ contact }: ChatHeaderProps) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold text-lg leading-none">
        {contact?.displayName.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-xl font-semibold">{contact?.displayName ?? ''}</h3>
      </div>
      <div className="space-x-4">
        <button className="text-xl">⋮</button>
      </div>
    </div>
  );
};

export default ChatHeader;
