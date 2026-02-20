// Sidebar Item Component (modified to accept onClick)
const SidebarItem = ({ icon: Icon, label, active, open, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition ${
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      <Icon className="text-xl" />
      {open && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};
export default SidebarItem;
