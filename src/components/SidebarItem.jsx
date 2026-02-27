// Enhanced Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, open, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition-all duration-200 group ${active
        ? "bg-gradient-to-r from-indigo-50 to-indigo-50/50 text-indigo-600 shadow-sm shadow-indigo-100 font-semibold"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        }`}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
        : "bg-transparent text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600"
        }`}>
        <Icon className="text-sm" />
      </div>
      {open && <span className="text-sm">{label}</span>}
      {open && active && (
        <div className="ml-auto w-1.5 h-5 rounded-full bg-indigo-600" />
      )}
    </button>
  );
};
export default SidebarItem;
