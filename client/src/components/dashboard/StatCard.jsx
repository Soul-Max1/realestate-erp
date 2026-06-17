import { FiTrendingUp } from "react-icons/fi";

const StatCard = ({
  title,
  value,
  color = "bg-blue-600",
  icon: Icon,
  trend,
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900">
              {value}
            </h3>
            {trend && (
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  trend > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <FiTrendingUp
                  size={16}
                  style={{
                    transform: `scaleY(${
                      trend > 0 ? 1 : -1
                    })`,
                  }}
                />
                {Math.abs(trend)}%
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={`${color} rounded-lg p-3 text-white ml-4`}
          >
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;