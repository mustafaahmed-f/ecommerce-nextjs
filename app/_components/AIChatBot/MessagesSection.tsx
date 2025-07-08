import { systemInstruction } from "@/app/_lib/chatBotContants";
import { ChatHistory, ChatSettings } from "@/app/_types/ChatBotTypes";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import ChatMessage from "./ChatMessage";

interface MessagesSectionProps {
  messages: ChatHistory;
  setMessages: React.Dispatch<React.SetStateAction<ChatHistory>>;
}

function MessagesSection({ messages, setMessages }: MessagesSectionProps) {
  const { toast } = useToast();

  // const [messages, setMessages] = useState<ChatHistory>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const settings: ChatSettings = {
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction,
  };

  const msgContainer = useRef<HTMLDivElement | null>(null);
  const inputField = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const container = msgContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (input.trim() === "") return;
    setLoading(true);
    const history: ChatHistory = messages;
    setMessages((prevMessages: ChatHistory) => [
      ...prevMessages,
      { role: "user", parts: [{ text: input }] },
    ]);
    setInput("");

    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ history, userMessage: input, settings }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "model", parts: [{ text: data.response }] },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }

  return (
    <div className="flex h-full max-h-screen min-h-[300px] w-full flex-col bg-sky-300 px-2 pb-1 pt-3 text-black">
      <div
        className="messages-section flex-grow scroll-m-2 overflow-y-auto px-1 shadow-inner"
        ref={msgContainer}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            messageParts={message.parts}
            isFromUser={message.role === "user"}
          />
        ))}
        {loading && (
          <div className="my-2 h-2 w-full">
            <span className="my-1 me-auto h-2 w-2 animate-pulse rounded-full bg-slate-50 p-2"></span>
          </div>
        )}
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto mb-1 mt-5 w-full border-slate-800 px-2"
        >
          <textarea
            name="prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="max-h-[12rem] min-h-[4rem] w-full resize-y overflow-auto rounded border border-slate-800 p-2 pe-20"
            placeholder="Type a message ..."
            ref={inputField}
            autoComplete="off"
          />
          <Button
            variant={"ghost"}
            type="submit"
            disabled={loading}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className={`${loading ? "pointer-events-none opacity-65" : ""} absolute right-2 top-0 hover:bg-transparent hover:underline`}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default MessagesSection;
