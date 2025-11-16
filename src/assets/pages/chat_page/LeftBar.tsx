import { useMemo } from "react";
import { Mail } from "lucide-react";
import ContactItem from "./Contact";
import umkmData from "../../umkm.json";

export default function LeftSidebar({
  selectedContact,
  setSelectedContact,
  searchQuery,
  setSearchQuery,
}: any) {
  const filteredContacts = useMemo(() => {
    const filtered = umkmData.filter(
      (c) =>
        c.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.nama_usaha?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return searchQuery ? filtered : filtered.slice(0, 10);
  }, [searchQuery]);

  return (
    <aside className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Welcome to Chat</h2>
        <p className="text-xs text-gray-600">Tanyakan informasi penting kepada pemilik!</p>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-500 focus:border-red-900 focus:ring-1 focus:ring-red-900"
          />
          <Mail size={16} className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      {/* Contacts */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 will-change-scroll">
        {filteredContacts.map((c) => (
          <ContactItem
            key={c.Id}
            contact={c}
            isSelected={selectedContact?.Id === c.Id}
            onSelect={() =>
              setSelectedContact(
                selectedContact?.Id === c.Id ? null : c
              )
            }
          />
        ))}

        {filteredContacts.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-4">
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
}
