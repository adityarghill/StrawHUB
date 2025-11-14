import { useState } from "react";
import {
  Mail,
  Bell,
  Image,
  Smile,
  MoreVertical,
} from "lucide-react";

export default function ChatInterface() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold">Welcome to Chat</h2>
          <p className="text-xs text-zinc-400">Find and chat with friends!</p>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-zinc-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-zinc-800 rounded-md py-2 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-500"
            />
            <Mail size={16} className="absolute left-3 top-2.5 text-zinc-500" />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 bg-zinc-800/40 hover:bg-zinc-700/60 rounded-md text-left transition"
              onClick={() => console.log("Open chat", i)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm">User {i}</p>
                <p className="text-xs text-zinc-400 truncate">
                  Last message preview here...
                </p>
              </div>
              <div className="text-xs text-zinc-500">9:4{i} PM</div>
            </button>
          ))}
        </div>
      </aside>

      {/* RIGHT CHAT AREA */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full" />
            <h2 className="font-semibold text-sm">Wertypop</h2>
          </div>
          <div className="flex items-center gap-2">
            <Bell
              size={20}
              className="text-zinc-400 hover:text-white cursor-pointer"
            />
            <MoreVertical
              size={20}
              className="text-zinc-400 hover:text-white cursor-pointer"
            />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center text-zinc-500 text-sm">
            You are now chatting with{" "}
            <span className="text-purple-400 font-semibold">Wertypop</span>.
          </div>

          {/* Incoming message */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold">Wertypop</span>
                <span className="text-xs text-zinc-500">8:47 PM</span>
              </div>
              <p className="text-sm mt-1 bg-zinc-800 px-3 py-2 rounded-md w-fit">
                Heyy m
              </p>
            </div>
          </div>

          {/* Outgoing message */}
          <div className="flex items-start gap-3 justify-end">
            <div>
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-xs text-zinc-500">8:48 PM</span>
                <span className="font-semibold">You</span>
              </div>
              <p className="text-sm mt-1 bg-blue-600 px-3 py-2 rounded-md w-fit max-w-xs text-right">
                Hey hey! How are you?
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-zinc-900 border-t border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <button className="text-zinc-500 hover:text-zinc-300">
              <Image size={20} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-zinc-800 rounded-md px-3 py-2 text-sm outline-none"
            />
            <button className="text-zinc-500 hover:text-zinc-300">
              <Smile size={20} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
