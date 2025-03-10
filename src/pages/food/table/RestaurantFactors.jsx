import React, { useState, useEffect } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Utensils  } from "lucide-react";

export default function Customer() {
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
      id: "restaurant_selection_factors",
      header: "restaurant selection factors",
      accessorKey: "restaurant_selection_factors",
      filterType: "text",
    },
    {
      id: "restaurant_discovery_method",
      header: "restaurant discovery method",
      accessorKey: "restaurant_discovery_method",
      filterType: "text",
    },
    {
      id: "preferred_dining_location",
      header: "preferred dining locationn",
      accessorKey: "preferred_dining_location",
      filterType: "select",
    },
    {
      id: "travel_time_acceptable",
      header: "travel time acceptable",
      accessorKey: "travel_time_acceptable",
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
          <Utensils  className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Restaurant Factors
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