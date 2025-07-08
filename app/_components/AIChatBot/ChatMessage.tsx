import { MessagePart } from "@/app/_types/ChatBotTypes";

interface ChatMessageProps {
  messageParts: MessagePart[];
  isFromUser: boolean;
}

function ChatMessage({ messageParts, isFromUser }: ChatMessageProps) {
  // console.log("Message : ", message);
  return (
    <div className={`${isFromUser ? "ps-4" : "pe-4"} my-2 w-full`}>
      <div
        className={`${isFromUser ? "ms-auto rounded-bl-xl rounded-br-none bg-slate-800 text-white" : "me-auto rounded-bl-none rounded-br-xl border bg-slate-50 text-slate-800"} my-1 w-fit rounded-tl-xl rounded-tr-xl p-2`}
      >
        <div className="whitespace-pre-wrap break-words">
          {messageParts.map((part, index) => (
            <span key={index}>{part.text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
