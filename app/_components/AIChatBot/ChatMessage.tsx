interface ChatMessageProps {
  message: string;
  isFromUser1: boolean;
}

function ChatMessage({ message, isFromUser1 }: ChatMessageProps) {
  return (
    <div className="w-full">
      <div
        className={`${isFromUser1 ? "ms-auto rounded-bl-xl rounded-br-none bg-slate-800 text-white" : "me-auto rounded-bl-none rounded-br-xl border bg-slate-50 text-slate-800"} my-1 w-fit rounded-tl-xl rounded-tr-xl p-2`}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;
