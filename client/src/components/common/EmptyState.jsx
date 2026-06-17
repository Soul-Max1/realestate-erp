import { FiInbox } from "react-icons/fi";

const EmptyState = ({
  icon: Icon = FiInbox,
  title = "No data found",
  description = "There's nothing to display here",
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-gray-400">
        <Icon size={48} className="mx-auto" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-md">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
