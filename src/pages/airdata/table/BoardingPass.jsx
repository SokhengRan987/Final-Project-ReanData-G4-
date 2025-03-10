import React, { useState, useEffect } from "react";
import { useGetAllBoardingpassesQuery } from "../../../redux/services/BoardingPass";
import TableComponent from "../../../components/TableComponent";
import { Ticket, RefreshCw, Download } from "lucide-react"; // Added Ticket, RefreshCw, Download

export default function BoardingPass() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
    ...(filters.booking_ref && { booking_ref: filters.booking_ref }),
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch, // Added refetch for the Refresh button
  } = useGetAllBoardingpassesQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const columns = [
    { id: "pass_id", header: "Pass ID", accessorKey: "pass_id", filterType: "text" },
    { id: "passenger_id", header: "Passenger ID", accessorKey: "passenger_id", filterType: "text" },
    { id: "booking_leg_id", header: "Booking Leg ID", accessorKey: "booking_leg_id", filterType: "select" },
    { id: "seat", header: "Seat", accessorKey: "seat", filterType: "text" },
    { id: "boarding_time", header: "Boarding Time", accessorKey: "boarding_time", filterType: "text" },
    { id: "update_ts", header: "Update Timestamp", accessorKey: "update_ts", filterType: "text" },
  ];

  const boardingData = data?.data || [];
  const totalRecords = data?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  useEffect(() => {
    setOffset(0);
  }, [filters]);

  return (
    <div className="flex-1 p-5 pt-20">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Ticket className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Boarding Passes</h1>
              {/* <p className="text-gray-500 mt-1">View and manage all boarding pass details</p> */}
            </div>
          </div>

          {/* Optional Action Buttons (commented out, uncomment if needed) */}
          {/* <div className="flex flex-wrap gap-2">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div> */}
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full">
          <TableComponent
            columns={columns}
            data={boardingData}
            isLoading={isLoading || isFetching}
            error={isError ? error?.message || error?.data?.message || "Unknown error" : null}
            offset={offset}
            setOffset={setOffset}
            recordsPerPage={limit}
            totalRecords={totalRecords}
            totalPages={totalPages}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
    </div>
  );
}