import React, { useState, useEffect } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Users, ShoppingBag } from "lucide-react";

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
      id: "id",
      header: "User ID",
      accessorKey: "id",
      filterType: "text",
    },
    {
      id: "age_range",
      header: "Age Range",
      accessorKey: "age_range",
      filterType: "text",
    },
    {
      id: "occupation",
      header: "occupation",
      accessorKey: "occupation",
      filterType: "select",
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      filterType: "text",
    },
    {
      id: "eating_out_frequency",
      header: "eating out frequency",
      accessorKey: "eating_out_frequency",
      filterType: "text",
    },
    {
      id: "preferred_promotions",
      header: "preferred promotions",
      accessorKey: "preferred_promotions",
      filterType: "text",
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
          <ShoppingBag className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Customer
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