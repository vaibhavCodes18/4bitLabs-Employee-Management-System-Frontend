export const DetailItem = ({ label, value }) => (
    <div className="border-b border-gray-100 pb-2">
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-base font-medium text-gray-800 mt-1">{value || "-"}</p>
    </div>
  );