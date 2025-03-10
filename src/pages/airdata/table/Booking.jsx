import React, { useState, useEffect } from "react";
import { useGetAllBookingsQuery } from "../../../redux/services/BookingSlice";
import TableComponent from "../../../components/TableComponent";
import { DollarSign, RefreshCw, Download, AlertTriangle, Ticket } from "lucide-react";

export default function Booking() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

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
    refetch,
  } = useGetAllBookingsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const columns = [
    { id: "booking_id", header: "Booking ID", accessorKey: "booking_id", filterType: "text" },
    { id: "booking_ref", header: "Booking Ref", accessorKey: "booking_ref", filterType: "text" },
    { id: "booking_name", header: "Booking Name", accessorKey: "booking_name", filterType: "select" },
    { id: "update_ts", header: "Update Timestamp", accessorKey: "update_ts", filterType: "text" },
    {
      id: "price",
      accessorKey: "price",
      filterType: "text",
    },
  ];

  const bookingData = data?.data || [];
  const totalRecords = data?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  useEffect(() => {
    setOffset(0);
  }, [filters]);

  // Example stats (replace with real calculations if API provides more data)
  const totalPrice = bookingData.reduce((sum, booking) => sum + (parseFloat(booking.price) || 0), 0);


  return (
    <main className="flex-1 p-5 pt-20">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Ticket className="h-6 w-6 text-blue-600" /> {/* Using Ticket as a placeholder */}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bookings</h1>
            </div>
          </div>
          {/* <div className="flex flex-wrap gap-2">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div> */}
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <p className="text-2xl font-semibold mt-1">
                  {isError
                    ? "Error"
                    : isLoading || isFetching
                    ? "Loading..."  
                    : bookingData.length}
                </p>
            </div>
            <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <Ticket className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            {!isLoading && !isError && <span>Bookings up-to-date</span>}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold mt-1">
                {isError ? "Error" : isLoading || isFetching ? "Loading..." : `$${totalPrice.toFixed(2)}` || "—"}
              </p>
            </div>
            <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            {!isLoading && !isError && <span>Revenue calculated</span>}
          </div>
        </div>
      </div> */}

      {/* Error Message */}
      {isError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error?.message || error?.data?.message || "An error occurred while fetching booking data."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <TableComponent
          columns={columns}
          data={bookingData}
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
    </main>
  );
}