"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Clock, Sun, Moon, Users } from "lucide-react";

export default function TimeBasedFood() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    {
      id: "usual_dining_time",
      header: "Usual Dining Time",
      accessorKey: "usual_dining_time",
      filterType: "select",
    },
    {
      id: "international_order_frequency",
      header: "International Order Frequency",
      accessorKey: "international_order_frequency",
      filterType: "select",
    },
    {
      id: "morning_preferences",
      header: "Morning Preferences",
      accessorKey: "morning_preferences",
      filterType: "select",
      cell: ({ row }) => row.original.morning_preferences?.join(", ") || "N/A",
    },
    {
      id: "evening_preferences",
      header: "Evening Preferences",
      accessorKey: "evening_preferences",
      filterType: "select",
      cell: ({ row }) => row.original.evening_preferences?.join(", ") || "N/A",
    },
    {
      id: "night_preferences",
      header: "Night Preferences",
      accessorKey: "night_preferences",
      filterType: "select",
      cell: ({ row }) => row.original.night_preferences?.join(", ") || "N/A",
    },
  ];

  const formatQueryParams = (filters) => {
    const params = { limit, offset };
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        const encodedValue = encodeURIComponent(value);
        if (key === "morning_preferences" || key === "evening_preferences" || key === "night_preferences") {
          params[key] = `cs.{${encodedValue}}`; // Array fields use cs
        } else if (key === "usual_dining_time" || key === "international_order_frequency") {
          params[key] = `eq.${encodedValue}`; // String fields use eq
        } else if (key === "global") {
          params[key] = encodedValue;
        } else {
          params[key] = `ilike.*${encodedValue}*`;
        }
      }
    });
    return params;
  };

  const queryParams = formatQueryParams(filters);

  const { data: paginatedData, isLoading, isError, error, isFetching } = useGetAllFbQuery(
    queryParams,
    { refetchOnMountOrArgChange: true }
  );

  const fbData = paginatedData?.data || [];
  const totalCount = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    console.log("Customer Data:", fbData);
    console.log("Query Params:", queryParams);
    console.log("Current Filters:", filters);
    console.log("Pagination State:", { offset, totalCount, totalPages, currentPage: offset / limit + 1 });
    setOffset(0); // Reset on filter change
  }, [filters]);

  useEffect(() => {
    console.log("Data Updated:", { fbDataLength: fbData.length, offset, totalCount });
  }, [fbData, offset, totalCount]);

  const handlePageChange = useCallback(
    (newOffset) => {
      const validOffset = Math.max(
        0,
        Math.min(Math.floor(newOffset / limit) * limit, (totalPages - 1) * limit)
      );
      console.log("Page Change:", { newOffset, validOffset, currentPage: validOffset / limit + 1 });
      setOffset(validOffset);
      window.scrollTo({
        top: document.querySelector(".bg-white.rounded-lg")?.offsetTop - 100 || 0,
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

  const uniqueDiningTimes = new Set(fbData.map((customer) => customer.usual_dining_time).filter(Boolean)).size;
  const uniqueMorningPrefs = new Set(fbData.flatMap((c) => c.morning_preferences || []).filter(Boolean)).size;
  const uniqueEveningPrefs = new Set(fbData.flatMap((c) => c.evening_preferences || []).filter(Boolean)).size;

  if (isError) {
    return (
      <main className="flex-1 pt-20 p-5">
        <div className="text-red-500">
          Error loading data: {error?.message || "Unknown error"}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 pt-20 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Time-Based Food Preferences</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "Loading..." : totalCount.toLocaleString()}
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
                <p className="text-sm font-medium text-gray-500">Total Dining Times</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : uniqueDiningTimes.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Morning Preferences</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : uniqueMorningPrefs.toLocaleString()}
                </p>
              </div>
              <div className="bg-pink-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Sun className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Evening Preferences</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : uniqueEveningPrefs.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Moon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <TableComponent
          columns={columns}
          data={fbData}
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