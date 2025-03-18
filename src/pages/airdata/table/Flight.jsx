"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllFlightQuery } from "../../../redux/services/Flight";
import TableComponent from "../../../components/TableComponent";
import { Plane, Clock, ArrowRight, Globe, MapPin, Users } from "lucide-react";

export default function Flight() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    {
      id: "flight_id",
      header: "Flight ID",
      accessorKey: "flight_id",
      filterType: "select",
    },
    {
      id: "flight_no",
      header: "Flight No",
      accessorKey: "flight_no",
      filterType: "select",
    },
    {
      id: "scheduled_departure",
      header: "Scheduled Departure",
      accessorKey: "scheduled_departure",
      filterType: "select",
      cell: ({ row }) =>
        row.original.scheduled_departure
          ? new Date(row.original.scheduled_departure).toLocaleString()
          : "N/A",
    },
    {
      id: "scheduled_arrival",
      header: "Scheduled Arrival",
      accessorKey: "scheduled_arrival",
      filterType: "select",
      cell: ({ row }) =>
        row.original.scheduled_arrival
          ? new Date(row.original.scheduled_arrival).toLocaleString()
          : "N/A",
    },
    {
      id: "departure_airport",
      header: "From",
      accessorKey: "departure_airport",
      filterType: "select",
    },
    {
      id: "arrival_airport",
      header: "To",
      accessorKey: "arrival_airport",
      filterType: "select",
    },
    {
      id: "aircraft_code",
      header: "Aircraft",
      accessorKey: "aircraft_code",
      filterType: "select",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      filterType: "select",
      cell: ({ row }) => {
        const status = row.original.status || "On schedule"; // Default from your sample data
        const statusStyles = {
          "On schedule": "bg-green-100 text-green-800 border border-green-200",
          Delayed: "bg-amber-100 text-amber-800 border border-amber-200",
          Cancelled: "bg-red-100 text-red-800 border border-red-200",
        };
        const statusLabels = {
          "On schedule": "On Schedule",
          Delayed: "Delayed",
          Cancelled: "Cancelled",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[status] || statusStyles["On schedule"]
            }`}
          >
            {statusLabels[status] || status}
          </span>
        );
      },
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
  } = useGetAllFlightQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const flightData = paginatedData?.data || [];
  const totalCount = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    console.log("Filters updated in Flight.jsx:", filters);
    setOffset(0);
  }, [filters]);

  const handlePageChange = useCallback(
    (newOffset) => {
      const validOffset = Math.floor(newOffset / limit) * limit;
      setOffset(validOffset);
      window.scrollTo({
        top:
          document.querySelector(".bg-white.rounded-lg")?.offsetTop - 100 || 0,
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
    console.log("Received filters in Flight.jsx:", filterObj);

    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        newFilters[key] = value;
      }
    });

    console.log("Applying filters in Flight.jsx:", newFilters);
    setFilters(newFilters);
  }, []);

  // Updated counts to match flight data
  const flightNoCount = getUniqueCount(flightData, "flight_no");
  const departureAirportCount = getUniqueCount(flightData, "departure_airport");
  const arrivalAirportCount = getUniqueCount(flightData, "arrival_airport");

  return (
    <main className="flex-1 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Flights
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
                  Total Flights
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isError ? "Error" : isLoading ? "Loading..." : totalCount}
                </p>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Flight Numbers
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : flightNoCount}
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
                  Departure Airports
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : departureAirportCount}
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
                  Arrival Airports
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : arrivalAirportCount}
                </p>
              </div>
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <TableComponent
          columns={columns}
          data={flightData}
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