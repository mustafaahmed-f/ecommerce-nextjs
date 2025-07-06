import MessagesSection from "./MessagesSection";

interface ChatDialogProps {
  handleCloseChat: () => void;
}

function ChatDialog({ handleCloseChat }: ChatDialogProps) {
  return (
    <div
      className="absolute bottom-12 right-0 z-40 flex flex-col overflow-hidden rounded-lg border duration-300 animate-in slide-in-from-right"
      style={{
        width: "clamp(300px, 80vw, 320px)",
        height: "clamp(300px, 80vh, 400px)",
      }}
    >
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
