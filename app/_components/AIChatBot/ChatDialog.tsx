import MessagesSection from "./MessagesSection";

interface ChatDialogProps {
  handleCloseChat: () => void;
}

function ChatDialog({ handleCloseChat }: ChatDialogProps) {
  return (
    <div className="absolute bottom-12 right-0 z-40 flex w-full max-w-80 flex-col overflow-hidden rounded-lg border">
      <div className="flex w-full items-center justify-between bg-slate-700 px-2 py-2 text-white">
        <p></p>
        <p>Chat Bot</p>
        <span
          className="flex cursor-pointer items-center"
          onClick={handleCloseChat}
        >
          x
        </span>
      </div>
      <MessagesSection />
    </div>
  );
}

export default ChatDialog;
