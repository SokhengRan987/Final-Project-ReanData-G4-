import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Search, RefreshCw } from "lucide-react";

const TableComponent = ({
  columns,
  data,
  isLoading,
  error,
  offset,
  setOffset,
  recordsPerPage,
  totalRecords,
  totalPages,
  hasNextPage = null,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const currentPageIndex = Math.floor(offset / recordsPerPage);
  
  // Use data length to determine if we should show next page button
  // when totalRecords/totalPages aren't available
  const hasFullPage = data && data.length >= recordsPerPage;
  
  // If any of these are true, we can go to next page
  const canGoToNextPage = 
    // Explicit prop takes precedence
    hasNextPage === true || 
    // If we have a full page of data, there's likely more data
    (hasNextPage === null && hasFullPage) ||
    // If we have totalPages info, use it
    (totalPages && currentPageIndex + 1 < totalPages);
  
  const hasPreviousPage = currentPageIndex > 0;

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex: currentPageIndex,
        pageSize: recordsPerPage,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages || -1,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      const newOffset = newState.pageIndex * recordsPerPage;
      console.log("Pagination Change - New Offset:", newOffset);
      setOffset(newOffset);
    },
  });

  // Debug logs to track state
  // console.log("Table Props - offset:", offset, "totalRecords:", totalRecords, "totalPages:", totalPages, "hasNextPage:", hasNextPage);
  // console.log("Can go to next page:", canGoToNextPage, "Has full page:", hasFullPage);
  // console.log("Data length:", data?.length, "Records per page:", recordsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-gray-700">Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 border border-red-200 rounded-lg mx-4">
        <div className="text-red-500 font-medium mb-2">Error loading data</div>
        <div className="text-red-700">{error}</div>
      </div>
    );
  }

  const currentPage = currentPageIndex + 1;
  const showingRecords = data?.length || 0;
  const calculatedTotal = totalRecords || showingRecords;
  

  return (
    <div className="container mx-auto p-4 max-w-screen-2xl">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            {showingRecords > 0 && (
              <>Showing {offset + 1} - {offset + showingRecords} {totalRecords ? `of ${totalRecords}` : ''} records</>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data && data.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={columns.length} 
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            {data && data.length > 0 && (
              <>Page {currentPage} {totalPages ? `of ${totalPages}` : ''}</>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!hasPreviousPage}
              className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!canGoToNextPage}
              className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;