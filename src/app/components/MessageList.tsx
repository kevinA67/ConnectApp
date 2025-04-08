import { Messages } from "../types";

type MessageListProps = {
  messages: Messages[];
  user: string;
};

const MessageList = ({ messages, user }: MessageListProps) => {
  return (
    <div className="flex flex-col p-4 space-y-4 h-96 overflow-y-auto">
      {messages &&  messages.map((messages, index) => {
        if (messages.emisor === user) {
          return (
            <div className="flex justify-end" key={index}>
              <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                {messages.mensaje}
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex justify-start" key={index}>
            <div className="bg-gray-200 text-black p-3 rounded-lg max-w-xs">
              {messages.mensaje}
            </div>
          </div>
          );
        }
      })}

    </div>
  );
};

export default MessageList;
