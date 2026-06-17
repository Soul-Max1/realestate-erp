import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Table = ({
  columns,
  data,
  onSort,
  sortBy,
  sortDirection,
  loading = false,
  emptyState,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left font-semibold text-gray-900"
                  style={{
                    width: col.width,
                  }}
                >
                  {col.sortable && onSort ? (
                    <button
                      onClick={() =>
                        onSort(col.key)
                      }
                      className="flex items-center gap-2 hover:text-blue-600 transition"
                    >
                      {col.label}
                      {sortBy === col.key &&
                        (sortDirection ===
                        "asc" ? (
                          <FiChevronUp
                            size={16}
                          />
                        ) : (
                          <FiChevronDown
                            size={16}
                          />
                        ))}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8"
                >
                  {emptyState}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-3 text-gray-700"
                      style={{
                        width: col.width,
                      }}
                    >
                      {col.render
                        ? col.render(
                            row[col.key],
                            row
                          )
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
