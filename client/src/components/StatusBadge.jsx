import { statusColors } from "../constants/colors";

const StatusBadge = ({ status, variant = "badge" }) => {
  const statusConfig =
    statusColors[status] ||
    statusColors.Inactive;

  if (variant === "dot") {
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: statusConfig.text,
          }}
        />
        <span className="text-sm font-medium text-gray-700">
          {status}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${statusConfig.badge}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;