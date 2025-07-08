"use client";

import { useState } from "react";
import AIBotStarter from "./AIBotStarter";
import ChatDialog from "./ChatDialog";
import { ChatHistory } from "@/app/_types/ChatBotTypes";

interface AIBotSecionProps {}

function AIBotSecion({}: AIBotSecionProps) {
  const { 0: openChat, 1: setOpenChat } = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatHistory>([]);
  return (
    <div
      className={`fixed w-full ${process.env.NODE_ENV === "development" ? "bottom-16" : "bottom-5"} right-5 z-50 bg-green-400`}
    >
      <AIBotStarter
        handleOpenChat={() => {
          setOpenChat(!openChat);
        }}
      />
      {openChat && (
        <ChatDialog
          handleCloseChat={() => {
            setOpenChat(false);
          }}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}

export default AIBotSecion;
