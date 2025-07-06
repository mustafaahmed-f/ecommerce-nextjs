import { Input } from "../shadcn/input";
import ChatMessage from "./ChatMessage";

interface MessagesSectionProps {}

function MessagesSection({}: MessagesSectionProps) {
  const messages = [
    { msgText: "Hello", msgSender: "user1" },
    { msgText: "Hi", msgSender: "user2" },
    { msgText: "How are you?", msgSender: "user1" },
    { msgText: "I'm fine", msgSender: "user2" },
    { msgText: "Thanks", msgSender: "user1" },
    { msgText: "You're welcome", msgSender: "user2" },
    { msgText: "Bye", msgSender: "user1" },
    { msgText: "Goodbye", msgSender: "user2" },
  ];
  return (
    <div className="flex max-h-[400px] min-h-[330px] w-full flex-col bg-sky-300 px-2 pb-1 pt-3 text-black">
      <div className="messages-section flex-grow scroll-m-2 overflow-y-auto px-1 shadow-inner">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.msgText}
            isFromUser1={message.msgSender === "user1"}
          />
        ))}
      </div>
      <div className="relative">
        <Input
          className="mx-auto mb-1 mt-5 w-full border-slate-800 px-2"
          placeholder="Type a message ..."
        />
      </div>
    </div>
  );
}

export default MessagesSection;
