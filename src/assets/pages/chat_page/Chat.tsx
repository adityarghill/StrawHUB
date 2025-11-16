import { useState } from "react";
import LeftSidebar from "./LeftBar";
import RightChat from "./RightBar";

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <LeftSidebar
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="flex-1 flex flex-col">
        <RightChat selectedContact={selectedContact} />
      </main>
    </div>
  );
}
