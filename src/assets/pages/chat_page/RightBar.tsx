import { useState, useRef, useEffect } from "react";
import { Bell, Image, Smile, MoreVertical, User, Send, Gift } from "lucide-react";

const GIFS = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODk0bDd6N3RxZ3N0aHoxenU1MDJyNXJnMTU3cTQxa3pmMjBqOHY0cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zys4m3vEX78Dwt9Ua9/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cmt6aGd5dzFwMzVlbjQ2dGM3MmRqcDdqM21kNGV0N3p3ZGJhMm9wZyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/h5xCNzl4iZJy4JBZlz/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmh1M3k2NXUxczRyZTZ4andudzV0ajV2eHV6ZzRxOWd6MnB5Nzl4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xULW8AglxVpxbnRnag/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVscHc5MWJod254c2xvNm1jeTc2ZmU2NHR1M2ZkY2MzYmEweWd1YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OpfkuToK5gSHK/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3R0M2lvYWZhZnA5c2IyemNmNXNpajcwY2VxeGI2Njg0OW1zenJhMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VVh7txo37uooM/giphy.gif"
];

export default function RightChat({ selectedContact }: any) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ text?: string; gif?: string; sender: 'user' | 'contact'; time: string }>>([]);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120); // Max height 120px (about 5 lines)
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [message]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  if (!selectedContact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white">
        <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MDU3dm94dmZkM2R5ZmkxandvM20xazIzZzlhaDV3MWhqcjR0dW5ldCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/l3q2TgUOycw4wwwZW/giphy.gif" alt="Start chatting" className="w-60 h-60 object-contain" />
        <p className="text-gray-600 text-lg">Mulai percakapan</p>
      </div>
    );
  }

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      text: message,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    
    // Simulate contact response after 1.5 seconds
    setTimeout(() => {
      const responses = [
        "Terima kasih atas pesannya!",
        "Baik, saya mengerti.",
        "Apakah ada yang bisa saya bantu?",
        "Terima kasih sudah menghubungi kami.",
        "Saya akan segera merespons permintaan Anda."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, {
        text: randomResponse,
        sender: 'contact',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const sendGif = (gifUrl: string) => {
    const newMessage = {
      gif: gifUrl,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMessage]);
    setShowGifPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden ring-2 ring-red-100">
              {selectedContact.img_tumb ? (
                <img
                  src={selectedContact.img_tumb}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <User size={20} className="text-gray-400" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-semibold text-sm text-gray-900">{selectedContact.username}</h2>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} className="text-gray-600 hover:text-red-900" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical size={20} className="text-gray-600 hover:text-red-900" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-center">
          <div className="bg-gray-100 text-gray-600 text-xs px-4 py-2 rounded-full shadow-sm">
            You are now chatting with <span className="text-red-900 font-semibold">{selectedContact.username}</span>
          </div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className="flex items-end gap-2 max-w-[70%]">
              {msg.sender === 'contact' && (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {selectedContact.img_tumb ? (
                    <img
                      src={selectedContact.img_tumb}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <User size={12} className="text-gray-400" />
                  )}
                </div>
              )}
              <div className="flex flex-col">
                <div className={`px-4 py-2 rounded-2xl shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-red-900 text-white rounded-br-sm' 
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                }`}>
                  {msg.text && <p className="text-sm break-words">{msg.text}</p>}
                  {msg.gif && (
                    <img 
                      src={msg.gif} 
                      alt="GIF" 
                      className="rounded-lg max-w-xs w-full"
                      loading="lazy"
                    />
                  )}
                </div>
                <span className={`text-xs text-gray-500 mt-1 px-2 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg relative">
        {/* GIF Picker */}
        {showGifPicker && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-h-80 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Choose a GIF</h3>
              <button 
                onClick={() => setShowGifPicker(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {GIFS.map((gif, i) => (
                <button
                  key={i}
                  onClick={() => sendGif(gif)}
                  className="rounded-lg overflow-hidden hover:ring-2 hover:ring-red-900 transition-all"
                >
                  <img 
                    src={gif} 
                    alt={`GIF ${i + 1}`} 
                    className="w-full h-24 object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end gap-2">
          <button 
            onClick={() => setShowGifPicker(!showGifPicker)}
            className="p-2.5 text-gray-600 hover:text-red-900 hover:bg-red-50 rounded-xl transition-colors"
          >
            <Gift size={22} />
          </button>
          <button className="p-2.5 text-gray-600 hover:text-red-900 hover:bg-red-50 rounded-xl transition-colors">
            <Image size={22} />
          </button>
          
          <div className="flex-1 relative bg-gray-50 rounded-2xl border border-gray-300 focus-within:border-red-900 focus-within:ring-2 focus-within:ring-red-100 transition-all">
            <textarea
              ref={textareaRef}
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              className="w-full bg-transparent px-4 py-3 pr-12 text-sm outline-none resize-none max-h-32 overflow-y-auto"
              style={{ minHeight: '44px' }}
            />
            <button className="absolute right-2 bottom-2 p-2 text-gray-600 hover:text-red-900 hover:bg-white rounded-full transition-colors">
              <Smile size={20} />
            </button>
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-red-900 hover:bg-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:shadow-none hover:scale-105 disabled:scale-100"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}