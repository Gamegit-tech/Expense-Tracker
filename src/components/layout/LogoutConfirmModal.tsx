import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";
import { useAuth } from "@/context/AuthContext";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutConfirmModal({ isOpen, onClose }: LogoutConfirmModalProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Out">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
          <Icon name="alert-circle" className="h-5 w-5" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to log out? You'll need to sign back in to access your expenses.
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Log Out
        </button>
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}