import { Bot } from "lucide-react";
import { Button } from "../shadcn/button";

interface AIBotStarterProps {
  handleOpenChat: () => void;
}

function AIBotStarter({ handleOpenChat }: AIBotStarterProps) {
  return (
    <Button
      onClick={handleOpenChat}
      className="absolute bottom-0 right-0 z-40 h-10 w-10 cursor-pointer rounded-full bg-sky-500 hover:bg-sky-600"
    >
      <Bot strokeWidth={1} />
    </Button>
  );
}

export default AIBotStarter;
