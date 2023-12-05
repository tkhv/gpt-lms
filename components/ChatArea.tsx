import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";

export default function ChatArea() {
  const { courseName } = useRouter().query;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([
    "Hi, I'm GPTa for " + courseName + ". How can I help you?",
  ]);

  const sendMsgHandler = () => {
    setMessages([...messages, currentMessage]);
    setCurrentMessage("");
  };

  return (
    <div className="flex flex-col">
      <ScrollArea className="flex flex-col bg-gray-500 h-[79.7vh] pt-2 pb-2">
        {messages.map((message, idx) => (
          <>
            <div key={idx} className="text-sm pl-5 pr-5">
              {idx % 2 === 0 ? "🤖 " : "👤 "}
              {message}
              <Separator className="my-2" />
            </div>
          </>
        ))}
      </ScrollArea>
      <div className="flex flex-row h-[7vh]">
        <div className="h-[100%] w-[90%]">
          <Textarea
            placeholder="Type your message here. GPTa is powered by AI, so mistakes are possible."
            defaultValue={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            value={currentMessage}
          />
        </div>
        <Button className="h-[100%] w-[10%]" onClick={sendMsgHandler}>
          Send
        </Button>
      </div>
    </div>
  );
}
