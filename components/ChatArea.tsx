import { useState } from "react";

export default function ChatArea() {
  const [messages, setMessages] = useState([]);

  return (
    <div style={{ flex: 1, backgroundColor: "blue" }}>
      <div style={{ flex: 1, backgroundColor: "grey", height: "79.7vh" }}>
        ChatArea
      </div>
      <div style={{ flex: 1, backgroundColor: "pink", height: "7vh" }}>
        TextArea
      </div>
    </div>
  );
}
// height: "87%"
