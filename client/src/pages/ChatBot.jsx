import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey there! 💍 I'm your wedding assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("backend api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const reply = data.reply;
      setTyping(false);
      setMessages([...newMessages, { from: "bot", text: reply }]);
    } catch (error) {
      setTyping(false);
      setMessages([
        ...newMessages,
        { from: "bot", text: "Oops! I couldn’t connect right now 💔" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Icon Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-4 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-colors"
      >
        {open ? <X size={22} /> : <MessageCircle size={26} />}
      </motion.button>
  
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-80 bg-white/80 backdrop-blur-lg border border-pink-200 shadow-xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-pink-500 text-white px-4 py-2">
              <h3 className="font-semibold">Wedding Assistant 💕</h3>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="p-3 h-80 overflow-y-auto flex flex-col space-y-2">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.from === "user" ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.from === "user"
                      ? "bg-pink-500 text-white self-end"
                      : "bg-pink-100 text-gray-800 self-start"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {/* Typing dots */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                  className="bg-pink-100 text-gray-600 p-2 rounded-lg w-fit self-start"
                >
                  <span className="animate-pulse">Typing...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="flex border-t border-pink-200">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 text-sm outline-none bg-transparent"
              />
              <button
                onClick={sendMessage}
                className="px-3 text-pink-500 hover:text-pink-600"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
