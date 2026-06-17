import { FiLoader } from "react-icons/fi";

const LoadingSpinner = ({ size = "lg", text = "Loading..." }) => {
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <FiLoader className={`${sizeClass} animate-spin text-blue-600`} />
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
