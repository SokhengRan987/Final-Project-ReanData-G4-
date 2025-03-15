"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, XCircle } from "lucide-react"; // Removed RefreshCw
import debounce from "lodash/debounce";

const TableComponent = ({
  columns,
  data,
  isLoading,
  isFetching,
  error,
  offset,
  setOffset,
  recordsPerPage,
  totalRecords,
  totalPages,
  onFilterChange,
  initialFilters = {},
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [globalInput, setGlobalInput] = useState("");
  const [filterInputs, setFilterInputs] = useState({});
  const currentPageIndex = Math.floor(offset / recordsPerPage);
  const isInitialMount = useRef(true);
  const prevInitialFiltersRef = useRef({});
  const isUpdatingFilters = useRef(false);

  const updateFilters = useCallback(
    debounce((newGlobal, newColumnFilters) => {
      console.log(
        "Debounced update - Global:",
        newGlobal,
        "Column Filters:",
        newColumnFilters
      );
      setGlobalFilter(newGlobal || "");
      setColumnFilters(newColumnFilters);
    }, 300),
    []
  );

  const handleGlobalFilterChange = (value) => {
    setGlobalInput(value);
    const newColumnFilters = columnFilters.map((f) => ({ ...f }));
    updateFilters(value, newColumnFilters);
  };

  const handleFilterInputChange = (columnId, value) => {
    setFilterInputs((prev) => ({ ...prev, [columnId]: value }));
    const newColumnFilters = columnFilters
      .filter((f) => f.id !== columnId)
      .concat(value ? [{ id: columnId, value }] : []);
    updateFilters(globalInput, newColumnFilters);
  };

  const handleReset = useCallback(() => {
    console.log("Reset button clicked - Current state before reset:", {
      globalInput,
      globalFilter,
      columnFilters,
      filterInputs,
    });
    setGlobalInput("");
    setGlobalFilter("");
    setColumnFilters([]);
    setFilterInputs({});
    console.log("Reset button - State after reset:", {
      globalInput: "",
      globalFilter: "",
      columnFilters: [],
      filterInputs: {},
    });
    if (onFilterChange) {
      const resetFilters = { _refresh: Date.now() };
      console.log("Calling onFilterChange with reset filters:", resetFilters);
      onFilterChange(resetFilters);
    } else {
      console.log("onFilterChange is not defined!");
    }
  }, [onFilterChange]);

  const hasFilters = globalFilter || columnFilters.length > 0;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (Object.keys(initialFilters).length > 0) {
        const newColumnFilters = Object.entries(initialFilters).map(
          ([id, value]) => ({
            id,
            value:
              id === "intnl" && value === "true"
                ? "Yes"
                : id === "intnl" && value === "false"
                ? "No"
                : value,
          })
        );
        setColumnFilters(newColumnFilters);
        const inputs = {};
        newColumnFilters.forEach((filter) => {
          inputs[filter.id] = filter.value || "";
        });
        setFilterInputs(inputs);
        if (initialFilters.global) {
          setGlobalFilter(initialFilters.global);
          setGlobalInput(initialFilters.global);
        }
      }
      return;
    }

    const prevInitialFilters = prevInitialFiltersRef.current;
    const hasChanged = Object.keys({
      ...prevInitialFilters,
      ...initialFilters,
    }).some((key) => prevInitialFilters[key] !== initialFilters[key]);

    if (!hasChanged) return;

    prevInitialFiltersRef.current = { ...initialFilters };
    const newColumnFilters = Object.entries(initialFilters).map(
      ([id, value]) => ({
        id,
        value:
          id === "intnl" && value === "true"
            ? "Yes"
            : id === "intnl" && value === "false"
            ? "No"
            : value,
      })
    );
    setColumnFilters(newColumnFilters);
    const inputs = {};
    newColumnFilters.forEach((filter) => {
      inputs[filter.id] = filter.value || "";
    });
    setFilterInputs(inputs);
    if (initialFilters.global) {
      setGlobalFilter(initialFilters.global);
      setGlobalInput(initialFilters.global);
    }
  }, [initialFilters]);

  useEffect(() => {
    if (isInitialMount.current || isUpdatingFilters.current) {
      isUpdatingFilters.current = false;
      return;
    }
    if (onFilterChange) {
      const filtersWithGlobal = {
        ...Object.fromEntries(columnFilters.map((f) => [f.id, f.value])),
        global: globalFilter || undefined,
      };
      console.log(
        "Automatic update - Sending filters to parent:",
        filtersWithGlobal
      );
      onFilterChange(filtersWithGlobal);
    }
  }, [columnFilters, globalFilter, onFilterChange]);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination: { pageIndex: currentPageIndex, pageSize: recordsPerPage },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualFiltering: true,
    rowCount: totalRecords || 0,
    pageCount: totalPages || 1,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      setOffset(newState.pageIndex * recordsPerPage);
    },
    globalFilterFn: "includesString",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
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


  return (
    <div className="container mx-auto p-4 max-w-screen-2xl">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-1/3">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={globalInput}
                  onChange={(e) => handleGlobalFilterChange(e.target.value)}
                  placeholder="Search all columns..."
                  className="w-full pl-8 pr-2 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {hasFilters && (
                <button
                  onClick={handleReset}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  title="Reset filters"
                >
                  <XCircle
                    className={`h-5 w-5 ${
                      isLoading || isFetching ? "animate-spin" : ""
                    }`}
                  />
                </button>
              )}
            </div>
            <div className="text-sm text-gray-700">
              {showingRecords > 0 && (
                <>
                  Showing {offset + 1} - {offset + showingRecords} records
                </>
              )}
            </div>
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
                      <div className="flex flex-col gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            {header.column.columnDef.filterType === "select" ? (
                              <select
                                value={header.column.getFilterValue() ?? ""}
                                onChange={(e) =>
                                  header.column.setFilterValue(
                                    e.target.value || undefined
                                  )
                                }
                                className="w-full px-2 py-1 border rounded text-sm"
                              >
                                <option value="">All</option>
                                {header.column.columnDef.filterOptions
                                  ? header.column.columnDef.filterOptions.map(
                                      (option) => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      )
                                    )
                                  : Array.from(
                                      header.column
                                        .getFacetedUniqueValues()
                                        .keys()
                                    ).map((value) => (
                                      <option key={value} value={value}>
                                        {value}
                                      </option>
                                    ))}
                              </select>
                            ) : (
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                                <input
                                  type="text"
                                  value={filterInputs[header.column.id] || ""}
                                  onChange={(e) =>
                                    handleFilterInputChange(
                                      header.column.id,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Filter..."
                                  className="w-full pl-7 pr-2 py-1 border rounded text-sm"
                                />
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
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
              <>
                Page {currentPage} {totalPages ? `of ${totalPages}` : ""}
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
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
