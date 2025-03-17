"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllFbQuery } from "../../../redux/services/FoodBeverage";
import TableComponent from "../../../components/TableComponent";
import { Users, ShoppingBag, Utensils, Drumstick, Coffee, Briefcase, Globe } from "lucide-react";

export default function FoodAndBeverage() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    {
      id: "preferred_cuisines",
      header: "Preferred Cuisines",
      accessorKey: "preferred_cuisines",
      filterType: "select",
      cell: ({ row }) => row.original.preferred_cuisines?.join(", ") || "N/A",
    },
    {
      id: "preferred_beverages",
      header: "Preferred Beverages",
      accessorKey: "preferred_beverages",
      filterType: "select",
    },
    {
      id: "preferred_dining_method",
      header: "Preferred Dining Method",
      accessorKey: "preferred_dining_method",
      filterType: "select",
    },
    {
      id: "international_food_preference",
      header: "International Food Preference",
      accessorKey: "international_food_preference",
      filterType: "select",
    },
  ];

  const formatQueryParams = (filters) => {
    const params = { limit, offset };
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        const encodedValue = encodeURIComponent(value);
        if (key === "preferred_cuisines") {
          params[key] = `cs.${value.includes(" ") ? `{"${value}"}` : `{${value}}`}`;
        } else if (key === "preferred_dining_method" || key === "international_food_preference") {
          params[key] = `eq.${encodedValue}`;
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
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    console.log("Customer Data:", fbData);
    console.log("Query Params:", queryParams);
    console.log("Current Filters:", filters);
    console.log("Pagination State:", { offset, totalCount, totalPages, currentPage });
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
    const newFilters = {};
    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        newFilters[key] = value;
      }
    });
    setFilters(newFilters);
  }, []);

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
    <main className="flex-1 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Drumstick className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Food & Beverage (F&B)</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Cuisines</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.flatMap((customer) => customer.preferred_cuisines || [])).size.toLocaleString()}
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
                <p className="text-sm font-medium text-gray-500">Total Beverages</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.map((customer) => customer.preferred_beverages).filter(Boolean)).size.toLocaleString()}
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
                <p className="text-sm font-medium text-gray-500">Total Dining Methods</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.map((customer) => customer.preferred_dining_method).filter(Boolean)).size.toLocaleString()}
                </p>
              </div>
              <div className="bg-pink-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total International Preferences</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading
                    ? "—"
                    : new Set(fbData.map((customer) => customer.international_food_preference).filter(Boolean)).size.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-purple-600" />
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