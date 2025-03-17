"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Utensils, Coffee, Building, Clock } from "lucide-react";

export default function RestaurantFactors() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    {
      id: "restaurant_selection_factors",
      header: "Restaurant Selection Factors",
      accessorKey: "restaurant_selection_factors",
      filterType: "select",
      cell: ({ row }) => row.original.restaurant_selection_factors?.join(", ") || "N/A",
    },
    {
      id: "restaurant_discovery_method",
      header: "Restaurant Discovery Method",
      accessorKey: "restaurant_discovery_method",
      filterType: "select",
    },
    {
      id: "preferred_dining_location",
      header: "Preferred Dining Location",
      accessorKey: "preferred_dining_location",
      filterType: "select",
    },
    {
      id: "travel_time_acceptable",
      header: "Travel Time Acceptable",
      accessorKey: "travel_time_acceptable",
      filterType: "select",
    },
  ];

  const formatQueryParams = (filters) => {
    const params = { limit, offset };
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        if (key === "restaurant_selection_factors") {
          // Fix for array contains query - use the correct syntax for your API
          params[key] = `cs.{${value}}`; // No URL encoding here as it may cause issues with brackets
        } else if (
          key === "restaurant_discovery_method" ||
          key === "preferred_dining_location" ||
          key === "travel_time_acceptable"
        ) {
          params[key] = `eq.${value}`; // No URL encoding needed here
        } else if (key === "global") {
          params[key] = value;
        } else {
          params[key] = `ilike.*${value}*`;
        }
      }
    });
    console.log("Formatted Query Params:", params);
    return params;
  };

  const queryParams = formatQueryParams(filters);

  const { data: paginatedData, isLoading, isError, error, isFetching } = useGetAllFbQuery(
    queryParams,
    { refetchOnMountOrArgChange: true }
  );

  // Log raw data for debugging
  console.log("Raw API Response:", paginatedData);
  console.log("Is Loading:", isLoading, "Is Fetching:", isFetching, "Is Error:", isError, "Error:", error);

  const fbData = paginatedData?.data || [];
  const totalRecords = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  // Fallback mock data if API fails
  const mockData = [
    {
      restaurant_selection_factors: ["Price", "Quality"],
      restaurant_discovery_method: "Friends",
      preferred_dining_location: "Downtown",
      travel_time_acceptable: "30 minutes",
    },
    {
      restaurant_selection_factors: ["Ambiance", "Service"],
      restaurant_discovery_method: "Online",
      preferred_dining_location: "Suburbs",
      travel_time_acceptable: "15 minutes",
    },
  ];

  useEffect(() => {
    console.log("Processed fbData:", fbData);
    console.log("Total Records:", totalRecords);
    console.log("Query Params Sent:", queryParams);
    console.log("Current Filters:", filters);
    console.log("Pagination State:", { offset, totalRecords, totalPages, currentPage });
    console.log("Unique Filter Values:", {
      restaurant_selection_factors: [...new Set(fbData.flatMap((d) => d.restaurant_selection_factors || []))],
      restaurant_discovery_method: [...new Set(fbData.map((d) => d.restaurant_discovery_method))],
      preferred_dining_location: [...new Set(fbData.map((d) => d.preferred_dining_location))],
      travel_time_acceptable: [...new Set(fbData.map((d) => d.travel_time_acceptable))],
    });
  }, [filters, fbData, offset]);

  const handlePageChange = useCallback(
    (newOffset) => {
      const validOffset = Math.max(
        0,
        Math.min(Math.floor(newOffset / limit) * limit, (totalPages - 1) * limit)
      );
      console.log("Page Change Triggered:", { newOffset, validOffset, newPage: validOffset / limit + 1 });
      setOffset(validOffset);
      window.scrollTo({
        top: document.querySelector(".bg-white.rounded-lg")?.offsetTop - 100 || 0,
        behavior: "smooth",
      });
    },
    [limit, totalPages]
  );

  const handleFilterChange = useCallback((filterObj) => {
    console.log("Filter Change Received:", filterObj);
    const newFilters = {};
    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        newFilters[key] = value;
      }
    });
    console.log("New Filters Set:", newFilters);
    setFilters(newFilters);
    setOffset(0);
  }, []);

  if (isError) {
    return (
      <main className="flex-1 pt-20 p-5">
        <div className="text-red-500">
          Error loading data: {error?.message || "Unknown error"}
          <p>Using mock data instead.</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-4">
          <TableComponent
            columns={columns}
            data={mockData}
            isLoading={false}
            isFetching={false}
            offset={offset}
            setOffset={handlePageChange}
            recordsPerPage={limit}
            totalRecords={mockData.length}
            totalPages={Math.ceil(mockData.length / limit)}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
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
              <Utensils className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Restaurant Factors</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Selection Factors</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.flatMap((customer) => customer.restaurant_selection_factors || [])).size.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Utensils className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Discovery Methods</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.map((customer) => customer.restaurant_discovery_method).filter(Boolean)).size.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Coffee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Dining Locations</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.map((customer) => customer.preferred_dining_location).filter(Boolean)).size.toLocaleString()}
                </p>
              </div>
              <div className="bg-pink-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Travel Times</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.map((customer) => customer.travel_time_acceptable).filter(Boolean)).size.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
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
          totalRecords={totalRecords}
          totalPages={totalPages}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />
      </div>
    </main>
  );
}