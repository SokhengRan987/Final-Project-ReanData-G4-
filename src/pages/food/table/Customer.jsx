import React, { useState, useEffect } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Users, ShoppingBag } from "lucide-react";


export default function Customer() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 20;

  // Handle search term changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setFilters(prev => ({ ...prev, search: searchTerm }));
      } else if (filters.search) {
        const newFilters = { ...filters };
        delete newFilters.search;
        setFilters(newFilters);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
  };
  
  // Add all filters to query params
  if (filters.gender) {
    queryParams.gender = filters.gender;
  }
  
  if (filters.search) {
    queryParams.search = filters.search;
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
      header: "UserID",
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </main>
  );
}