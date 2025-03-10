import React, { useState, useEffect } from "react";
import { useGetAllPassengersQuery } from "../../../redux/services/PassengerSlice";
import TableComponent from "../../../components/TableComponent";
import {
  DollarSign,
  RefreshCw,
  Download,
  AlertTriangle,
  Ticket,
  Users
} from "lucide-react";

export default function Passenger() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
    ...(filters.booking_ref && { booking_ref: filters.booking_ref }),
  };

  const { data, isLoading, isError, error, isFetching } =
    useGetAllPassengersQuery(queryParams, {
      refetchOnMountOrArgChange: true, // Refetch when offset or filters change
    });

  const columns = [
    {
      id: "passenger_id",
      header: "Passenger ID",
      accessorKey: "passenger_id",
      filterType: "text",
    },
    {
      id: "booking_id",
      header: "Booking ID",
      accessorKey: "booking_id",
      filterType: "text",
    },
    {
      id: "booking_ref",
      header: "Booking Ref",
      accessorKey: "booking_ref",
      filterType: "select",
    },
    {
      id: "update_ts",
      header: "Update Ts",
      accessorKey: "update_ts",
      filterType: "text",
    },
    {
      id: "age",
      header: "Age",
      accessorKey: "age",
      filterType: "text",
    },
  ];

  // Extract data zand total from response
  const passengerData = data?.data || [];
  const totalRecords = data?.total || 0; // Use total from API
  const totalPages = Math.ceil(totalRecords / limit);

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
  }, [filters]);

  return (
    <main className="flex-1 pt-20 p-5">
      {/* <h2 className="text-4xl font-bold pb-4">Passenger</h2> */}

      <div className="flex items-center">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <Users className="h-6 w-6 text-blue-600" />{" "}
          {/* Using Ticket as a placeholder */}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Passenger
          </h1>
        </div>
      </div>
      <TableComponent
        columns={columns}
        data={passengerData}
        isLoading={isLoading || isFetching} // Show loading during fetch/refetch
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
    </main>
  );
}
