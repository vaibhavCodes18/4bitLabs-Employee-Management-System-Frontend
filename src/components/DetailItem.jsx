export const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-sm font-medium text-gray-800">{value || "—"}</p>
  </div>
);