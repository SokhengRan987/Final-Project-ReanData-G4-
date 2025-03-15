import React, { useState, useEffect } from "react";
import { useGetAllAirportsQuery } from "../../../redux/services/AirportSlice";
import TableComponent from "../../../components/TableComponent";
import { DollarSign } from "lucide-react";
import {
  Plane,
  Globe,
  MapPin,
  Globe2,
  RefreshCw,
  Download,
} from "lucide-react";

export default function Airport() {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({});
  const limit = 20;

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
    ...(filters.booking_ref && { booking_ref: filters.booking_ref }),
    ...(filters.airport_code && { airport_code: filters.airport_code }),
  };

  
  const { data, isLoading, isError, error, isFetching } =
    useGetAllAirportsQuery(queryParams, {
      refetchOnMountOrArgChange: true, // Refetch when offset or filters change
    });

  const columns = [
    {
      accessorKey: "airport_code", // The key to access the data in each row
      header: "Airport Code", // The column header label
      filterType: "text", // Custom filterType to be used later
    },
    {
      accessorKey: "airport_name",
      header: "Airport Name",
      filterType: "text",
    },
    {
      accessorKey: "city",
      header: "City",
      filterType: "select",
      // filterOptions: ["Los Angeles", "New York", "Chicago"], // Filter options for select
    },
    {
      accessorKey: "airport_tz",
      header: "Timezone",
      filterType: "select",
      // filterOptions: ["PST", "EST"], // Filter options for select
    },
    {
      accessorKey: "continent",
      header: "Continent",
      filterType: "select",
      // filterOptions: ["North America", "Europe", "Asia"], // Filter options for select
    },
    {
      accessorKey: "iso_country",
      header: "Country",
      filterType: "text",
    },
    {
      accessorKey: "intnl",
      header: "International",
      // Render a custom value for this column (e.g., "Yes" or "No")
      render: (row) => (row.intnl ? "Yes" : "No"),
      // filterType: "select",
      // filterOptions: ["Yes", "No"], // Select filter options
    },
  ];

  // Extract data and total from response
  const aieportData = data?.data || [];
  const totalRecords = data?.total || 0; // Use total from API
  const totalPages = Math.ceil(totalRecords / limit);

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0);
  }, [filters]);

  return (
    <main className="flex-1 pt-20 p-5">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Airports
              </h1>
              <p className="text-gray-500 mt-1"></p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Airports
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {isError
                    ? "Error"
                    : isLoading || isFetching
                    ? "Loading..."
                    : aieportData.length}
                </p>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {!isLoading && !isError && <span>Database complete</span>}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  International
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {aieportData.length > 0
                    ? aieportData.filter((airport) => airport.intnl).length
                    : "—"}
                </p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {!isLoading && !isError && <span>International airports</span>}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Countries</p>
                <p className="text-2xl font-semibold mt-1">
                  {aieportData.length > 0
                    ? new Set(aieportData.map((airport) => airport.iso_country))
                        .size
                    : "—"}
                </p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {!isLoading && !isError && <span>Unique countries</span>}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Continents</p>
                <p className="text-2xl font-semibold mt-1">
                  {aieportData.length > 0
                    ? new Set(aieportData.map((a) => a.continent)).size
                    : "—"}
                </p>
              </div>
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe2 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {!isLoading && !isError && <span>Global coverage</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        {/* <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Airport Directory</h2>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => refetch && refetch()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>

            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                <Plane className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Airports</p>
                <p className="text-lg font-semibold">{totalRecords || "—"}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <Globe className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">International</p>
                <p className="text-lg font-semibold">
                  {aieportData.filter((airport) => airport.intnl).length || "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-md mr-3">
                <MapPin className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Countries</p>
                <p className="text-lg font-semibold">
                  {aieportData.length > 0 ? new Set(aieportData.map((a) => a.iso_country)).size : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center">
              <div className="bg-orange-100 p-2 rounded-md mr-3">
                <Globe2 className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Continents</p>
                <p className="text-lg font-semibold">
                  {aieportData.length > 0 ? new Set(aieportData.map((a) => a.continent)).size : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

        <TableComponent
          columns={columns}
          data={aieportData}
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
      </div>
    </main>
  );
}
