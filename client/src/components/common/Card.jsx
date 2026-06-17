const Card = ({
  children,
  className = "",
  hover = true,
  padding = "p-6",
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 shadow-sm
        ${hover ? "hover:shadow-md transition-shadow" : ""}
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
