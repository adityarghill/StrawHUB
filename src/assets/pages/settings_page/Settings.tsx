import { useState, useMemo, useCallback, type ReactNode } from "react";
import { 
  Bell, 
  Lock, 
  Globe, 
  Volume2, 
  Shield, 
  HelpCircle,
  ChevronRight,
  Mail,
  Phone,
  LogOut,
  Trash2,
  Eye,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";

// Types
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

interface SettingItem {
  icon: any;
  label: string;
  action: string;
  isToggle?: boolean;
  value?: boolean | string;
}

interface SettingsSection {
  title: string;
  items: SettingItem[];
}

interface BlockedUser {
  id: number;
  name: string;
  email: string;
}

type ModalType = 'email' | 'phone' | 'password' | 'language' | 'privacy' | 'blocked' | '2fa' | 'help' | 'support' | 'logout' | 'delete' | null;

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Email Settings Modal
const EmailSettingsModal = ({ isOpen, onClose, currentEmail }: { isOpen: boolean; onClose: () => void; currentEmail: string }) => {
  const [email, setEmail] = useState(currentEmail);
  
  const handleSubmit = useCallback(() => {
    console.log('Update email to:', email);
    onClose();
  }, [email, onClose]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Email Settings">
      <div className="space-y-4">
        <div>
          <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-2">Current Email</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <AlertTriangle size={16} className="inline mr-2" />
            Changing your email will require verification
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800">
            Update Email
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Phone Number Modal
const PhoneNumberModal = ({ isOpen, onClose, currentPhone }: { isOpen: boolean; onClose: () => void; currentPhone: string }) => {
  const [phone, setPhone] = useState(currentPhone);
  
  const handleSubmit = useCallback(() => {
    console.log('Update phone to:', phone);
    onClose();
  }, [phone, onClose]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Phone Number">
      <div className="space-y-4">
        <div>
          <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            id="phone-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800">
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Change Password Modal
const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  
  const handleSubmit = useCallback(() => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Change password');
    onClose();
  }, [passwords, onClose]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <div className="space-y-4">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input
            id="current-password"
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            id="new-password"
            type="password"
            value={passwords.new}
            onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <input
            id="confirm-password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800">
            Change Password
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Language Modal
const LanguageModal = ({ isOpen, onClose, currentLanguage, onSave }: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentLanguage: string;
  onSave: (lang: string) => void;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  
  const languages = useMemo(() => [
    "English", "Bahasa Indonesia", "Español", "Français", "Deutsch", "日本語", "中文"
  ], []);
  
  const handleSave = useCallback(() => {
    onSave(selectedLanguage);
    onClose();
  }, [selectedLanguage, onSave, onClose]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Language">
      <div className="space-y-2">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between ${
              selectedLanguage === lang ? 'bg-red-50 border-2 border-red-900' : 'border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium">{lang}</span>
            {selectedLanguage === lang && <Check size={20} className="text-red-900" />}
          </button>
        ))}
        <div className="pt-4">
          <button onClick={handleSave} className="w-full px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800">
            Save Language
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Privacy Settings Modal
const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [privacy, setPrivacy] = useState({
    showOnline: true,
    showLastSeen: true,
    readReceipts: true
  });
  
  const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-red-900' : 'bg-gray-300'}`}
      aria-checked={value}
      role="switch"
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${value ? 'translate-x-6' : 'translate-x-1'} mt-0.5`} />
    </button>
  );
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Settings">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <p className="font-medium text-gray-900">Show Online Status</p>
            <p className="text-sm text-gray-500">Let others see when you're online</p>
          </div>
          <ToggleSwitch 
            value={privacy.showOnline} 
            onChange={() => setPrivacy(prev => ({ ...prev, showOnline: !prev.showOnline }))} 
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <p className="font-medium text-gray-900">Last Seen</p>
            <p className="text-sm text-gray-500">Show your last active time</p>
          </div>
          <ToggleSwitch 
            value={privacy.showLastSeen} 
            onChange={() => setPrivacy(prev => ({ ...prev, showLastSeen: !prev.showLastSeen }))} 
          />
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <p className="font-medium text-gray-900">Read Receipts</p>
            <p className="text-sm text-gray-500">Show when you've read messages</p>
          </div>
          <ToggleSwitch 
            value={privacy.readReceipts} 
            onChange={() => setPrivacy(prev => ({ ...prev, readReceipts: !prev.readReceipts }))} 
          />
        </div>
        
        <button onClick={onClose} className="w-full px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 mt-4">
          Done
        </button>
      </div>
    </Modal>
  );
};

// Blocked Users Modal
const BlockedUsersModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    { id: 1, name: "Spam User", email: "spam@example.com" },
    { id: 2, name: "Annoying Person", email: "annoying@example.com" }
  ]);
  
  const handleUnblock = useCallback((userId: number) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
  }, []);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Blocked Users">
      <div className="space-y-3">
        {blockedUsers.length === 0 ? (
          <div className="text-center py-8">
            <Eye size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No blocked users</p>
          </div>
        ) : (
          blockedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button 
                onClick={() => handleUnblock(user.id)}
                className="px-4 py-2 text-sm border border-red-900 text-red-900 rounded-lg hover:bg-red-50"
              >
                Unblock
              </button>
            </div>
          ))
        )}
        <button onClick={onClose} className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 mt-4">
          Close
        </button>
      </div>
    </Modal>
  );
};

// Two-Factor Authentication Modal
const TwoFactorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Two-Factor Authentication">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">2FA Status</p>
            <p className="text-sm text-gray-500">{enabled ? 'Enabled' : 'Disabled'}</p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-red-900' : 'bg-gray-300'}`}
            role="switch"
            aria-checked={enabled}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'} mt-0.5`} />
          </button>
        </div>
        
        {!enabled ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Enable 2FA to add an extra layer of security to your account.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium">
                <Check size={16} className="inline mr-2" />
                Two-Factor Authentication is active
              </p>
            </div>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              View Recovery Codes
            </button>
          </div>
        )}
        
        <button onClick={onClose} className="w-full px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800">
          Done
        </button>
      </div>
    </Modal>
  );
};

// Help Center Modal
const HelpCenterModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const helpTopics = useMemo(() => [
    "Getting Started",
    "Account Settings",
    "Privacy & Security",
    "Troubleshooting",
    "Billing & Payments",
    "Report a Problem"
  ], []);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Help Center">
      <div className="space-y-2">
        {helpTopics.map((topic) => (
          <button
            key={topic}
            className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between group"
          >
            <span className="font-medium">{topic}</span>
            <ChevronRight size={20} className="text-gray-400 group-hover:text-red-900" />
          </button>
        ))}
        <div className="pt-4">
          <button onClick={onClose} className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Contact Support Modal
const ContactSupportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({ subject: "", message: "" });
  
  const handleSubmit = useCallback(() => {
    console.log('Send support message:', form);
    onClose();
  }, [form, onClose]);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Support">
      <div className="space-y-4">
        <div>
          <label htmlFor="support-subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <input
            id="support-subject"
            type="text"
            value={form.subject}
            onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="Brief description of your issue"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="support-message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            id="support-message"
            value={form.message}
            onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Describe your issue in detail..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800">
            Send Message
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Logout Confirmation Modal
const LogoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleLogout = useCallback(() => {
    setIsLoggingOut(true);
    
    setTimeout(() => {
      setIsLoggingOut(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        console.log('User logged out');
        onClose();
      }, 2000);
    }, 1000);
  }, [onClose]);
  
  const handleClose = useCallback(() => {
    if (!isLoggingOut && !showSuccess) {
      onClose();
    }
  }, [isLoggingOut, showSuccess, onClose]);
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Log Out">
      <div className="space-y-4">
        {!showSuccess ? (
          <>
            <div className="text-center py-4">
              <div className={`transition-all duration-300 ${isLoggingOut ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
                <LogOut size={48} className="mx-auto text-red-600 mb-4" />
              </div>
              <p className="text-lg font-medium text-gray-900">Are you sure you want to log out?</p>
              <p className="text-sm text-gray-500 mt-2">You'll need to log in again to access your account.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleClose} 
                disabled={isLoggingOut}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout} 
                disabled={isLoggingOut}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging out...
                  </>
                ) : (
                  'Log Out'
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-green-100 rounded-full animate-ping opacity-75" />
              <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                <svg 
                  className="w-12 h-12 text-white"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline 
                    points="20 6 9 17 4 12" 
                    className="animate-checkmark"
                    style={{
                      strokeDasharray: '24',
                      strokeDashoffset: '24',
                      animation: 'checkmark 0.6s ease-in-out 0.2s forwards'
                    }}
                  />
                </svg>
              </div>
            </div>
            <p className="text-xl font-bold text-green-600 mt-6 animate-fade-in">Successfully Logged Out!</p>
            <p className="text-sm text-gray-500 mt-2 animate-fade-in-delay">Redirecting...</p>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes checkmark {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
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
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.5s ease-out 0.5s both;
        }
      `}</style>
    </Modal>
  );
};

// Delete Account Modal
const DeleteAccountModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [confirmText, setConfirmText] = useState("");
  
  const handleDelete = useCallback(() => {
    if (confirmText === "DELETE") {
      console.log('Account deleted');
      onClose();
    }
  }, [confirmText, onClose]);
  
  const isDeleteEnabled = confirmText === "DELETE";
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Account">
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800 font-medium mb-2">
            <AlertTriangle size={16} className="inline mr-2" />
            Warning: This action cannot be undone!
          </p>
          <p className="text-sm text-red-700">
            Deleting your account will permanently remove all your data, messages, and settings.
          </p>
        </div>
        <div>
          <label htmlFor="delete-confirm" className="block text-sm font-medium text-gray-700 mb-2">
            Type "DELETE" to confirm
          </label>
          <input
            id="delete-confirm"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!isDeleteEnabled}
            className="flex-1 px-4 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Account
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Main Component
export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleToggle = useCallback((action: string) => {
    if (action === "notifications") setNotifications(prev => !prev);
    if (action === "sound") setSoundEnabled(prev => !prev);
  }, []);

  const handleAction = useCallback((action: ModalType) => {
    setActiveModal(action);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const settingsSections: SettingsSection[] = useMemo(() => [
    {
      title: "Account",
      items: [
        { icon: Mail, label: "Email Settings", action: "email" },
        { icon: Phone, label: "Phone Number", action: "phone" },
        { icon: Lock, label: "Change Password", action: "password" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", action: "notifications", isToggle: true, value: notifications },
        { icon: Volume2, label: "Sound", action: "sound", isToggle: true, value: soundEnabled },
        { icon: Globe, label: "Language", action: "language", value: selectedLanguage },
      ]
    },
    {
      title: "Security & Privacy",
      items: [
        { icon: Shield, label: "Privacy Settings", action: "privacy" },
        { icon: Eye, label: "Blocked Users", action: "blocked" },
        { icon: Lock, label: "Two-Factor Authentication", action: "2fa" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", action: "help" },
        { icon: Mail, label: "Contact Support", action: "support" },
      ]
    }
  ], [notifications, soundEnabled, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-red-900 text-white p-10 shadow-lg mt-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-red-100 text-sm mt-1">Manage your account and preferences</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {settingsSections.slice(0, 2).map((section, idx) => (
              <section key={idx} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden h-fit">
                <div className="bg-gradient-to-r from-red-50 to-white px-6 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-red-900">{section.title}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <button
                      key={item.action}
                      onClick={() => item.isToggle ? handleToggle(item.action) : handleAction(item.action as ModalType)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <item.icon size={20} className="text-red-900" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          {item.value && !item.isToggle && (
                            <p className="text-sm text-gray-500">{item.value}</p>
                          )}
                        </div>
                      </div>
                      {item.isToggle ? (
                        <div 
                          className={`w-12 h-6 rounded-full transition-colors ${
                            item.value ? 'bg-red-900' : 'bg-gray-300'
                          }`}
                          role="switch"
                          aria-checked={!!item.value}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          } mt-0.5`} />
                        </div>
                      ) : (
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-red-900 transition-colors" />
                      )}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {settingsSections.slice(2, 4).map((section, idx) => (
              <section key={idx} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden h-fit">
                <div className="bg-gradient-to-r from-red-50 to-white px-6 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-red-900">{section.title}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <button
                      key={item.action}
                      onClick={() => item.isToggle ? handleToggle(item.action) : handleAction(item.action as ModalType)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <item.icon size={20} className="text-red-900" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          {item.value && !item.isToggle && (
                            <p className="text-sm text-gray-500">{item.value}</p>
                          )}
                        </div>
                      </div>
                      {item.isToggle ? (
                        <div 
                          className={`w-12 h-6 rounded-full transition-colors ${
                            item.value ? 'bg-red-900' : 'bg-gray-300'
                          }`}
                          role="switch"
                          aria-checked={!!item.value}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          } mt-0.5`} />
                        </div>
                      ) : (
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-red-900 transition-colors" />
                      )}
                    </button>
                  ))}
                </div>
              </section>
            ))}

            {/* Danger Zone */}
            <section className="bg-white rounded-2xl shadow-md border border-red-200 overflow-hidden h-fit">
              <div className="bg-gradient-to-r from-red-50 to-white px-6 py-3 border-b border-red-200">
                <h3 className="font-semibold text-red-900">Danger Zone</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <button 
                  onClick={() => handleAction('logout')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <LogOut size={20} className="text-red-600" />
                    </div>
                    <p className="font-medium text-red-600">Log Out</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                </button>
                <button 
                  onClick={() => handleAction('delete')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Trash2 size={20} className="text-red-700" />
                    </div>
                    <p className="font-medium text-red-700">Delete Account</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-red-700 transition-colors" />
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Footer spanning full width at bottom */}
        <footer className="bg-gradient-to-r from-red-900 to-red-800 rounded-2xl shadow-md p-6 text-white text-center mt-6">
          <p className="text-sm opacity-90">StrawHUB UMKM</p>
          <p className="text-xs opacity-75 mt-1">© 2025 All rights reserved</p>
        </footer>
      </main>

      <EmailSettingsModal 
        isOpen={activeModal === 'email'} 
        onClose={closeModal} 
        currentEmail="john.doe@example.com"
      />
      <PhoneNumberModal 
        isOpen={activeModal === 'phone'} 
        onClose={closeModal} 
        currentPhone="+62 812-3456-7890"
      />
      <ChangePasswordModal 
        isOpen={activeModal === 'password'} 
        onClose={closeModal}
      />
      <LanguageModal 
        isOpen={activeModal === 'language'} 
        onClose={closeModal}
        currentLanguage={selectedLanguage}
        onSave={setSelectedLanguage}
      />
      <PrivacyModal 
        isOpen={activeModal === 'privacy'} 
        onClose={closeModal}
      />
      <BlockedUsersModal 
        isOpen={activeModal === 'blocked'} 
        onClose={closeModal}
      />
      <TwoFactorModal 
        isOpen={activeModal === '2fa'} 
        onClose={closeModal}
      />
      <HelpCenterModal 
        isOpen={activeModal === 'help'} 
        onClose={closeModal}
      />
      <ContactSupportModal 
        isOpen={activeModal === 'support'} 
        onClose={closeModal}
      />
      <LogoutModal 
        isOpen={activeModal === 'logout'} 
        onClose={closeModal}
      />
      <DeleteAccountModal 
        isOpen={activeModal === 'delete'} 
        onClose={closeModal}
      />
    </div>
  );
}
