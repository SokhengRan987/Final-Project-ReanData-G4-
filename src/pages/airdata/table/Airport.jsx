"use client"

import { useState, useEffect, useCallback } from "react"
import { useGetAllAirportsQuery } from "../../../redux/services/AirportSlice"
import TableComponent from "../../../components/TableComponent"
import { Plane, Globe, MapPin, Globe2 } from "lucide-react"

export default function Airport() {
  const [offset, setOffset] = useState(0)
  const [filters, setFilters] = useState({})
  const limit = 20

  const columns = [
    { id: "airport_code", accessorKey: "airport_code", header: () => "Airport Code", filterType: "select" },
    { id: "airport_name", accessorKey: "airport_name", header: () => "Airport Name", filterType: "select" },
    { id: "city", accessorKey: "city", header: () => "City", filterType: "select" },
    { id: "airport_tz", accessorKey: "airport_tz", header: () => "Timezone", filterType: "select" },
    { id: "continent", accessorKey: "continent", header: () => "Continent", filterType: "select" },
    { id: "iso_country", accessorKey: "iso_country", header: () => "Country", filterType: "select" },
    {
      id: "intnl",
      accessorKey: "intnl",
      header: () => "International",
      cell: ({ row }) => (row.original.intnl ? "Yes" : "No"),
      filterType: "select",
      filterOptions: ["Yes", "No"],
    },
  ]

  const queryParams = {
    limit,
    offset,
    ...filters,
  }

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllAirportsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  })

  const airportData = paginatedData?.data || []
  const totalCount = paginatedData?.total || 0
  const totalPages = Math.ceil(totalCount / limit)

  useEffect(() => {
    console.log("Filters updated in Airport.jsx:", filters)
    setOffset(0)
  }, [filters])

  const handlePageChange = useCallback((newOffset) => {
    const validOffset = Math.floor(newOffset / limit) * limit
    setOffset(validOffset)
    window.scrollTo({
      top: document.querySelector('.bg-white.rounded-lg')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    })
  }, [limit])

  const getUniqueCount = (dataArray, key) => {
    return dataArray?.length > 0 ? new Set(dataArray.map((item) => item[key])).size : 0
  }

  const handleFilterChange = useCallback((filterObj) => {
    const newFilters = {}
    console.log("Received filters in Airport.jsx:", filterObj)

    Object.entries(filterObj).forEach(([key, value]) => {
      if (key === "intnl" && value) {
        newFilters[key] = value === "Yes" ? "true" : "false"
      } else if (value && key !== '_refresh') {
        newFilters[key] = value
      }
    })

    console.log("Applying filters in Airport.jsx:", newFilters)
    setFilters(newFilters)
  }, [])

  const internationalCount = airportData.filter((airport) => airport.intnl).length
  const countriesCount = getUniqueCount(airportData, "iso_country")
  const continentsCount = getUniqueCount(airportData, "continent")

  return (
    <main className="flex-1 pt-20 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Airports</h1>
              {/* <p className="text-gray-500 mt-1">Total Records: {isLoading ? "Loading..." : totalCount}</p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Airports</p>
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
                <p className="text-sm font-medium text-gray-500">International</p>
                <p className="text-2xl font-semibold mt-1">{isLoading ? "—" : internationalCount}</p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Countries</p>
                <p className="text-2xl font-semibold mt-1">{isLoading ? "—" : countriesCount}</p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Continents</p>
                <p className="text-2xl font-semibold mt-1">{isLoading ? "—" : continentsCount}</p>
              </div>
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe2 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <TableComponent
          columns={columns}
          data={airportData}
          isLoading={isLoading || isFetching}
          isFetching={isFetching}
          error={isError ? error?.message || error?.data?.message || "Unknown error" : null}
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
  )
}