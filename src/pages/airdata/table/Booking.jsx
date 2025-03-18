"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllBookingsQuery } from "../../../redux/services/BookingSlice";
import TableComponent from "../../../components/TableComponent";
import { Plane, Mail, Phone, Clock,Ticket,DollarSign ,User   } from "lucide-react";

export default function Booking() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    {
      id: "booking_id",
      header: "Booking ID",
      accessorKey: "booking_id",
      filterType: "select",
    },
    {
      id: "booking_ref",
      header: "Reference",
      accessorKey: "booking_ref",
      filterType: "select",
    },
    {
      id: "update_ts",
      header: "Last Updated",
      accessorKey: "update_ts",
      filterType: "select",
      cell: ({ row }) =>
        row.original.update_ts
          ? new Date(row.original.update_ts).toLocaleString()
          : "N/A",
    },
    {
      id: "account_id",
      header: "Account ID",
      accessorKey: "account_id",
      filterType: "select",
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      filterType: "select",
      cell: ({ row }) =>
        row.original.price !== null
          ? `$${row.original.price.toFixed(2)}`
          : "N/A",
    },
  ];

  const queryParams = {
    limit,
    offset,
    ...filters,
  };

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllBookingsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const bookingData = paginatedData?.data || [];
  const totalCount = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    setOffset(0);
  }, [filters]);

  const handlePageChange = useCallback(
    (newOffset) => {
      const validOffset = Math.max(
        0,
        Math.min(
          Math.floor(newOffset / limit) * limit,
          (totalPages - 1) * limit
        )
      );
      setOffset(validOffset);
      window.scrollTo({
        top:
          document.querySelector(".bg-white.rounded-lg")?.offsetTop - 100 || 0,
        behavior: "smooth",
      });
    },
    [limit, totalPages]
  );

  const handleFilterChange = useCallback((filterObj) => {
    const newFilters = {};
    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        newFilters[key] = value;
      }
    });
    setFilters(newFilters);
  }, []);

  const uniqueAccounts = new Set(
    bookingData.map((booking) => booking.account_id)
  ).size;
  const hasEmailCount = bookingData.filter((booking) => booking.email).length;
  const totalPrice = bookingData.reduce((sum, booking) => sum + (booking.price || 0), 0);

  if (isError) {
    return (
      <main className="flex-1 pt-20 p-5">
        <div className="text-red-500">
          Error loading bookings: {error?.message || "Unknown error"}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Ticket className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Bookings
              </h1>
              {/* <p className="text-gray-500 mt-1">
                Total Records: {isLoading ? "Loading..." : totalCount.toLocaleString()}
              </p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "Loading..." : totalCount.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Ticket className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading 
                    ? "—" 
                    : totalPrice > 0 
                    ? `$${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "$0.00"}
                </p>
              </div>
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Accounts</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : uniqueAccounts.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <TableComponent
          columns={columns}
          data={bookingData}
          isLoading={isLoading || isFetching}
          isFetching={isFetching}
          error={error?.message || error?.data?.message}
          offset={offset}
          setOffset={handlePageChange}
          recordsPerPage={limit}
          totalRecords={totalCount}
          totalPages={totalPages}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />
      </div>
    </main>
  );
}
