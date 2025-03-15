import React, { useState, useEffect } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Clock } from "lucide-react";

export default function TimeBasedFood() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
    ...(filters.gender && { gender: filters.gender }), // Add gender filter if present
    ...(filters.searchTerm && { search: filters.searchTerm }),
  };

  // Only add gender filter if it's present and not empty
  if (filters.gender) {
    queryParams.gender = filters.gender;
  }

  // Add other filters if needed
  if (filters.searchTerm) {
    queryParams.search = filters.searchTerm;
  }

  const { data, isLoading, isError, error, isFetching } = useGetAllFbQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const columns = [
    {
      id: "usual_dining_time",
      header: "usual dining time",
      accessorKey: "usual_dining_time",
      filterType: "text",
    },
    {
      id: "international_order_frequency",
      header: "international order frequency",
      accessorKey: "international_order_frequency",
      filterType: "text",
    },
    {
      id: "morning_preferences",
      header: "morning preferences",
      accessorKey: "morning_preferences",
      filterType: "select",
    },
    {
      id: "evening_preferences",
      header: "evening preferences",
      accessorKey: "evening_preferences",
      filterType: "select",
    },
    {
      id: "night_preferences",
      header: "night preferences",
      accessorKey: "night_preferences",
      filterType: "select",
    },
  ];

  // Extract data and total from response
  const fbData = data?.data || [];
  const totalRecords = data?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  console.log("Customer Data:", fbData);
  console.log("Query Params:", queryParams);
  console.log("Current Filters:", filters);

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
  }, [filters]);

  return (
    <main className="flex-1 pt-20 p-5">
      <div className="flex items-center">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Time Base
          </h1>
        </div>
      </div>
      <TableComponent
        columns={columns}
        data={fbData}
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
    </main>
  );
}
