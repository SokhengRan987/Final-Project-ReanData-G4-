"use client";

import { useState, useEffect, useMemo } from "react";
import { useGetAllFlightQuery } from "../../../redux/services/Flight";
import TableComponent from "../../../components/TableComponent";
import {
  Plane,
  Clock,
  ArrowRight,
  Zap,
  Search,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  Users,
  X,
} from "lucide-react";

export default function Flight() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [time, setTime] = useState(new Date());
  const limit = 20;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Apply search when user presses enter or after delay
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setFilters((prev) => ({ ...prev, flight_no: searchTerm }));
      } else if (filters.flight_no) {
        const newFilters = { ...filters };
        delete newFilters.flight_no;
        setFilters(newFilters);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
    ...(filters.flight_no && { flight_no: filters.flight_no }),
    ...(filters.departure_airport && {
      departure_airport: filters.departure_airport,
    }),
    ...(filters.arrival_airport && {
      arrival_airport: filters.arrival_airport,
    }),
    ...(filters.booking_ref && { booking_ref: filters.booking_ref }),
    ...(filters.status && { status: filters.status }),
  };

  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetAllFlightQuery(queryParams, {
      refetchOnMountOrArgChange: true, // Refetch when offset or filters change
    });

  // Add status column to display flight status
  const columns = [
    {
      id: "flight_id",
      header: "Flight ID",
      accessorKey: "flight_id",
      filterType: "text",
    },
    {
      id: "flight_no",
      header: "Flight No",
      accessorKey: "flight_no",
      filterType: "text",
    },
    {
      id: "scheduled_departure",
      header: "Scheduled Departure",
      accessorKey: "scheduled_departure",
      filterType: "text",
      cell: ({ row }) => {
        const date = row.original.scheduled_departure;
        if (!date) return "-";
        return new Date(date).toLocaleString();
      },
    },
    {
      id: "scheduled_arrival",
      header: "Scheduled Arrival",
      accessorKey: "scheduled_arrival",
      filterType: "text",
      cell: ({ row }) => {
        const date = row.original.scheduled_arrival;
        if (!date) return "-";
        return new Date(date).toLocaleString();
      },
    },
    {
      id: "departure_airport",
      header: "From",
      accessorKey: "departure_airport",
      filterType: "text",
    },
    {
      id: "arrival_airport",
      header: "To",
      accessorKey: "arrival_airport",
      filterType: "text",
    },
    {
      id: "aircraft_code",
      header: "Aircraft",
      accessorKey: "aircraft_code",
      filterType: "text",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      filterType: "text",
      cell: ({ row }) => {
        // For demo purposes, randomly assign statuses if not present
        const statusOptions = ["on-time", "delayed", "cancelled"];
        const status =
          row.original.status || statusOptions[Math.floor(Math.random() * 3)];

        const statusStyles = {
          "on-time": "bg-green-100 text-green-800 border border-green-200",
          delayed: "bg-amber-100 text-amber-800 border border-amber-200",
          cancelled: "bg-red-100 text-red-800 border border-red-200",
        };

        const statusLabels = {
          "on-time": "On Time",
          delayed: "Delayed",
          cancelled: "Cancelled",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[status] || statusStyles["on-time"]
            }`}
          >
            {statusLabels[status] || "On Time"}
          </span>
        );
      },
    },
  ];

  // Extract data and total from response
  const flightData = data?.data || [];
  const totalRecords = data?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    if (type === "status") {
      if (value === "all") {
        const newFilters = { ...filters };
        delete newFilters.status;
        setFilters(newFilters);
      } else {
        setFilters((prev) => ({ ...prev, status: value }));
      }
      setActiveTab(value);
    } else if (type === "airport") {
      setFilters((prev) => ({ ...prev, departure_airport: value }));
    }
  };

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
  }, [filters]);

  // // Calculate loading progress
  // const loadingProgress =
  //   isLoading || isFetching ? Math.floor(Math.random() * 90) + 10 : 100;

  return (
    <main className="flex-1 pt-20 p-5">
    {/* <h2 className="text-4xl font-bold pb-4">Passenger</h2> */}
   
    <div className="flex items-center">
      
      <div className="bg-blue-100 p-3 rounded-lg mr-4">
        
        <Plane className="h-6 w-6 text-blue-600" />{" "}
        {/* Using Ticket as a placeholder */}
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Flight
        </h1>
      </div>
    </div>
    <TableComponent
      columns={columns}
      data={flightData}
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
