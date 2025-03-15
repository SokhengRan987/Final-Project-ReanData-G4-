"use client";

import { useState, useEffect } from "react";
import { useGetAllAircraftsQuery } from "../../../redux/services/Aircraft";
import TableComponent from "../../../components/TableComponent";
import {
  Plane,
  RefreshCw,
  Download,
  PlusCircle,
  AlertTriangle,
  Ruler,
  Wind,
  Tag,
  BarChart2,
} from "lucide-react";

export default function Aircraft() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState("table"); // table or cards
  const limit = 20;

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
    ...(filters.booking_ref && { booking_ref: filters.booking_ref }),
    ...(filters.model && { model: filters.model }),
    ...(filters.code && { code: filters.code }),
  };

  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetAllAircraftsQuery(queryParams, {
      refetchOnMountOrArgChange: true,
    });

  const columns = [
    {
      id: "model",
      header: "Model",
      accessorKey: "model",
      filterType: "text",
      icon: <Plane className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "range",
      header: "Range",
      accessorKey: "range",
      filterType: "text",
      icon: <Ruler className="h-4 w-4 text-green-500" />,
    },
    {
      id: "velocity",
      header: "Velocity",
      accessorKey: "velocity",
      filterType: "select",
      icon: <Wind className="h-4 w-4 text-purple-500" />,
    },
    {
      id: "code",
      header: "Code",
      accessorKey: "code",
      filterType: "text",
      icon: <Tag className="h-4 w-4 text-orange-500" />,
    },
  ];

  // Extract data and total from response
  const aircraftData = data?.data || [];
  const totalRecords = data?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
  }, [filters]);

  // Function to export data
  const handleExport = () => {
    // This would be implemented to export data to CSV/Excel
    alert("Export functionality would be implemented here");
  };

  return (
    <div className="flex-1 p-5 pt-20">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Aircraft
              </h1>
              {/* <p className="text-gray-500 mt-1">
                Manage and view all aircraft in the fleet
              </p> */}
            </div>
          </div>

          {/* <div className="flex flex-wrap gap-2">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>

            <button
              onClick={handleExport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>

            <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Aircraft
            </button>
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Aircraft
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isError
                    ? "Error"
                    : isLoading || isFetching
                    ? "Loading..."
                    : aircraftData.length || "—"}
                </p>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {!isLoading && !isError && <span>Fleet complete</span>}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Average Range
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {aircraftData.length > 0
                    ? Math.round(
                        aircraftData.reduce(
                          (acc, curr) => acc + Number(curr.range),
                          0
                        ) / aircraftData.length
                      )
                    : "—"}{" "}
                </p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Ruler className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {!isLoading && !isError && <span>Based on current page</span>}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Average Velocity
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {aircraftData.length > 0
                    ? Math.round(
                        aircraftData.reduce(
                          (acc, curr) => acc + Number(curr.velocity),
                          0
                        ) / aircraftData.length
                      )
                    : "—"}{" "}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Wind className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {!isLoading && !isError && <span>Based on current page</span>}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Models</p>
                <p className="text-2xl font-semibold mt-1">
                  {aircraftData.length > 0
                    ? new Set(aircraftData.map((a) => a.model)).size
                    : "—"}
                </p>
              </div>
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Tag className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {!isLoading && !isError && <span>Unique models</span>}
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end items-center mb-4">
          {/* <div className="text-sm text-gray-500">
            {!isLoading && !isError && (
              <span>
                Showing {Math.min(offset + 1, totalRecords)} to {Math.min(offset + limit, totalRecords)} of{" "}
                {totalRecords} aircraft
              </span>
            )}
          </div> */}

          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                viewMode === "table"
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-2" />
                Table
              </span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                viewMode === "cards"
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center">
                <div className="grid grid-cols-2 gap-0.5 h-4 w-4 mr-2">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
                Cards
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {isError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error?.message ||
                  error?.data?.message ||
                  "An error occurred while fetching aircraft data."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-lg border-gray-200 shadow-sm overflow-hidden">
          <TableComponent
            columns={columns}
            data={aircraftData}
            isLoading={isLoading || isFetching}
            error={
              isError
                ? error?.message || error?.data?.message || "Unknown error"
                : null
            }
            offset={offset}
            setOffset={setOffset}
            recordsPerPage={limit}
            totalRecords={totalRecords}
            totalPages={totalPages}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading
            ? // Loading skeletons for cards
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              ))
            : aircraftData.map((aircraft, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all hover:translate-y-[-2px] cursor-pointer"
                  onClick={() => setSelectedAircraft(aircraft)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {aircraft.model}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {aircraft.code}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <div className="bg-green-50 p-1.5 rounded-md mr-3">
                          <Ruler className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <span className="text-gray-500 block text-xs">
                            Range
                          </span>
                          <span className="font-medium">
                            {aircraft.range}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm">
                        <div className="bg-purple-50 p-1.5 rounded-md mr-3">
                          <Wind className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <span className="text-gray-500 block text-xs">
                            Velocity
                          </span>
                          <span className="font-medium">
                            {aircraft.velocity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-gray-400 mr-1.5" />
                    <span className="text-xs text-gray-500">{aircraft.manufacturer || "Unknown manufacturer"}</span>
                  </div>
                  <span className="text-xs text-gray-500">{aircraft.year ? `Year: ${aircraft.year}` : ""}</span>
                </div> */}
                </div>
              ))}

          {/* {!isLoading && aircraftData.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
              <Plane className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No aircraft found
              </h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your filters or adding a new aircraft
              </p>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Aircraft
              </button>
            </div>
          )} */}
        </div>
      )}

      {/* If using cards view, add pagination controls */}
      {viewMode === "cards" && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setOffset(Math.max(0, offset - limit))}
              disabled={offset === 0}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setOffset(offset + limit)}
              disabled={offset + limit >= totalRecords}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {Math.min(offset + 1, totalRecords)}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(offset + limit, totalRecords)}
                </span>{" "}
                of <span className="font-medium">{totalRecords}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setOffset(0)}
                  disabled={offset === 0}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">First</span>
                  <span className="h-5 w-5 flex items-center justify-center">
                    «
                  </span>
                </button>
                <button
                  onClick={() => setOffset(Math.max(0, offset - limit))}
                  disabled={offset === 0}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <span className="h-5 w-5 flex items-center justify-center">
                    ‹
                  </span>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  const pageOffset = Math.floor(offset / limit);
                  const startPage = Math.max(
                    0,
                    Math.min(pageOffset - 2, totalPages - 5)
                  );
                  const pageNum = startPage + i + 1;
                  const isCurrentPage = pageOffset + 1 === pageNum;

                  return (
                    <button
                      key={i}
                      onClick={() => setOffset((pageNum - 1) * limit)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        isCurrentPage
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setOffset(offset + limit)}
                  disabled={offset + limit >= totalRecords}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <span className="h-5 w-5 flex items-center justify-center">
                    ›
                  </span>
                </button>
                <button
                  onClick={() => setOffset((totalPages - 1) * limit)}
                  disabled={offset + limit >= totalRecords}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Last</span>
                  <span className="h-5 w-5 flex items-center justify-center">
                    »
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
