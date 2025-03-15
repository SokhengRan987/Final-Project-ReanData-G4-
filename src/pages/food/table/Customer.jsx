"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Users, ShoppingBag, Utensils, Building  } from "lucide-react";

export default function Customer() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    { id: "id", header: "User ID", accessorKey: "id", filterType: "select" },
    { id: "age_range", header: "Age Range", accessorKey: "age_range", filterType: "select" },
    { id: "occupation", header: "Occupation", accessorKey: "occupation", filterType: "select" },
    { id: "gender", header: "Gender", accessorKey: "gender", filterType: "select" },
    { id: "eating_out_frequency", header: "Eating Out Frequency", accessorKey: "eating_out_frequency", filterType: "select" },
    {
      id: "preferred_promotions",
      header: "Preferred Promotions",
      accessorKey: "preferred_promotions",
      filterType: "select",
      cell: ({ row }) => row.original.preferred_promotions?.join(", ") || "N/A",
    },
  ];

  const formatQueryParams = (filters) => {
    const params = { limit, offset };
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        if (key === "preferred_promotions") {
          params[key] = `cs.${value.includes(" ") ? `{"${value}"}` : `{${value}}`}`;
        } else if (key === "gender" || key === "id") {
          params[key] = `eq.${value}`;
        } else if (key === "global") {
          params[key] = value;
        } else {
          params[key] = `ilike.*${value}*`;
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
    setOffset(0);
  }, [filters]);

  const handlePageChange = useCallback(
    (newOffset) => {
      const validOffset = Math.max(
        0,
        Math.min(Math.floor(newOffset / limit) * limit, (totalPages - 1) * limit)
      );
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

  const uniqueOccupations = new Set(fbData.map((customer) => customer.occupation)).size;

  if (isError) {
    return (
      <main className="flex-1 pt-20 p-5">
        <div className="text-red-500">
          Error loading customers: {error?.message || "Unknown error"}
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
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customers</h1>
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
                <p className="text-sm font-medium text-gray-500">Total Gender Male</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : fbData.filter((customer) => customer.gender === "Male").length.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Gender Female</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : fbData.filter((customer) => customer.gender === "Female").length.toLocaleString()}
                </p>
              </div>
              <div className="bg-pink-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Occupations</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : uniqueOccupations.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Building  className="h-6 w-6 text-purple-600" />
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