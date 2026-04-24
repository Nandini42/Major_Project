import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  setMessages(prev => [...prev, userMessage]);

  setInput("");

  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: input })
    });

    const data = await response.json();

    const botMessage = {
      sender: "bot",
      text: data.answer
    };

    setMessages(prev => [...prev, botMessage]);

  } catch (error) {
    console.error("Error:", error);
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: "Backend error. Please try again." }
    ]);
  }
};
  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} style={styles.botIcon}>
        🤖
      </div>

      {isOpen && (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            News Assistant
            <span onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }}>✖</span>
          </div>

          <div style={styles.body}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#eee"
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.button}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  botIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "24px"
  },
  chatBox: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "420px",
    height: "600px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between"
  },
  body: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto"
  },
  message: {
    padding: "8px 12px",
    borderRadius: "15px",
    maxWidth: "80%"
  },
  inputArea: {
    display: "flex",
    padding: "10px"
  },
  input: {
    flex: 1,
    padding: "8px"
  },
  button: {
    marginLeft: "5px",
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none"
  }
};

export default Chatbot;