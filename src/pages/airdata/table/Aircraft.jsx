"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetAllAircraftsQuery } from "../../../redux/services/Aircraft";
import TableComponent from "../../../components/TableComponent";
import { Plane, Globe, MapPin, Wind } from "lucide-react";
import { data } from "autoprefixer";

export default function Aircraft() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const columns = [
    {
      id: "model",
      header: "Model",
      accessorKey: "model",
      filterType: "select",
    },
    {
      id: "range",
      header: "Range",
      accessorKey: "range",
      filterType: "select",
    },
    {
      id: "velocity",
      header: "Velocity",
      accessorKey: "velocity",
      filterType: "select",
    },
    {
      id: "code",
      header: "Code",
      accessorKey: "code",
      filterType: "select",
    },
  ];

  const queryParams = {
    limit,
    offset,
    ...filters,
  };

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllAircraftsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const aircraftData = paginatedData?.data || [];
  const totalCount = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    console.log("Filters updated in Aircraft.jsx:", filters);
    setOffset(0);
  }, [filters]);

  const handlePageChange = useCallback(
    (newOffset) => {
      const validOffset = Math.floor(newOffset / limit) * limit;
      setOffset(validOffset);
      window.scrollTo({
        top: document.querySelector(".bg-white.rounded-lg")?.offsetTop - 100 || 0,
        behavior: "smooth",
      });
    },
    [limit]
  );

  const getUniqueCount = (dataArray, key) => {
    return dataArray?.length > 0
      ? new Set(dataArray.map((item) => item[key])).size
      : 0;
  };

  const handleFilterChange = useCallback((filterObj) => {
    const newFilters = {};
    console.log("Received filters in Aircraft.jsx:", filterObj);

    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && key !== "_refresh") {
        newFilters[key] = value;
      }
    });

    console.log("Applying filters in Aircraft.jsx:", newFilters);
    setFilters(newFilters);
  }, []);

  // Updated counts to match aircraft data
  const modelCount = getUniqueCount(aircraftData, "model");
  const codeCount = getUniqueCount(aircraftData, "code");
  const rangeCount = getUniqueCount(aircraftData, "range");

  return (
    <main className="flex-1 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Aircraft
              </h1>
              {/* <p className="text-gray-500 mt-1">
                Total Records: {isLoading ? "Loading..." : totalCount}
              </p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Aircraft
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isError ? "Error" : isLoading ? "Loading..." : totalCount}
                </p>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Models
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : modelCount}
                </p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Codes
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : codeCount}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Ranges
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? "—" : rangeCount}
                </p>
              </div>
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Wind className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <TableComponent
          columns={columns}
          data={aircraftData}
          isLoading={isLoading || isFetching}
          isFetching={isFetching}
          error={
            isError
              ? error?.message || error?.data?.message || "Unknown error"
              : null
          }
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