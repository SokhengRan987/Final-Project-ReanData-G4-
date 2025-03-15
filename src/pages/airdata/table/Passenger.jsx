"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllPassengersQuery } from "../../../redux/services/PassengerSlice"; // Adjusted import path
import TableComponent from "../../../components/TableComponent";
import { Users, Globe, MapPin, Ticket } from "lucide-react";

export default function Passenger() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    {
      id: "passenger_id",
      header: "Passenger ID",
      accessorKey: "passenger_id",
      filterType: "select",
    },
    {
      id: "booking_id",
      header: "Booking ID",
      accessorKey: "booking_id",
      filterType: "select",
    },
    {
      id: "booking_ref",
      header: "Booking Ref",
      accessorKey: "booking_ref",
      filterType: "select",
    },
    {
      id: "age",
      header: "Age",
      accessorKey: "age",
      filterType: "select",
    },
    {
      id: "update_ts",
      header: "Update Timestamp",
      accessorKey: "update_ts",
      filterType: "select",
      cell: ({ row }) =>
        row.original.update_ts
          ? new Date(row.original.update_ts).toLocaleString()
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
  } = useGetAllPassengersQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const passengerData = paginatedData?.data || [];
  const totalCount = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    console.log("Filters updated in Passenger.jsx:", filters);
    setOffset(0);
  }, [filters]);

  const handlePageChange = useCallback(
    (newOffset) => {
      const validOffset = Math.floor(newOffset / limit) * limit;
      setOffset(validOffset);
      window.scrollTo({
        top: document.querySelector(".bg-white.rounded-lg")?.offsetTop - 100 || 0,
        behavior: "smooth",
      });
    },
    [limit]
  );

  const getUniqueCount = (dataArray, key) => {
    return dataArray?.length > 0
      ? new Set(dataArray.map((item) => item[key])).size
      : 0;
  };

  const handleFilterChange = useCallback((filterObj) => {
    const newFilters = {};
    console.log("Received filters in Passenger.jsx:", filterObj);

    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        newFilters[key] = value;
      }
    });

    console.log("Applying filters in Passenger.jsx:", newFilters);
    setFilters(newFilters);
  }, []);

  // Updated counts to match passenger data
  const passengerIdCount = getUniqueCount(passengerData, "passenger_id");
  const bookingIdCount = getUniqueCount(passengerData, "booking_id");
  const bookingRefCount = getUniqueCount(passengerData, "booking_ref");

  return (
    <main className="flex-1 pt-20 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Passengers
              </h1>
              {/* <p className="text-gray-500 mt-1">
                Total Records: {isLoading ? "Loading..." : totalCount}
              </p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Passengers
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isError ? "Error" : isLoading ? "Loading..." : totalCount}
                </p>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Passenger IDs
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : passengerIdCount}
                </p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                 Booking IDs
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : bookingIdCount}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Booking Refs
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : bookingRefCount}
                </p>
              </div>
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Ticket className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <TableComponent
          columns={columns}
          data={passengerData}
          isLoading={isLoading || isFetching}
          isFetching={isFetching}
          error={
            isError
              ? error?.message || error?.data?.message || "Unknown error"
              : null
          }
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