"use client"

import { useState, useEffect, useCallback } from "react"
import { useGetAllBoardingPassesQuery } from "../../../redux/services/BoardingPass"
import TableComponent from "../../../components/TableComponent"
import { Plane, Globe, MapPin, Globe2 } from "lucide-react"

export default function BoardingPass() { // Renamed for clarity
  const [offset, setOffset] = useState(0)
  const [filters, setFilters] = useState({})
  const limit = 20

  const columns = [
    { 
      id: "pass_id", 
      header: "Pass ID", 
      accessorKey: "pass_id", 
      filterType: "select"
    },
    { 
      id: "passenger_id", 
      header: "Passenger ID", 
      accessorKey: "passenger_id", 
      filterType: "select" 
    },
    { 
      id: "booking_leg_id", 
      header: "Booking Leg ID", 
      accessorKey: "booking_leg_id", 
      filterType: "select" 
    },
    { 
      id: "seat", 
      header: "Seat", 
      accessorKey: "seat", 
      filterType: "select" 
    },
    { 
      id: "boarding_time", 
      header: "Boarding Time", 
      accessorKey: "boarding_time", 
      filterType: "select",
      cell: ({ row }) => 
        row.original.boarding_time 
          ? new Date(row.original.boarding_time).toLocaleString() 
          : "N/A"
    },
    { 
      id: "update_ts", 
      header: "Update Timestamp", 
      accessorKey: "update_ts", 
      filterType: "select",
      cell: ({ row }) => 
        row.original.update_ts 
          ? new Date(row.original.update_ts).toLocaleString() 
          : "N/A"
    },
  ];

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
  } = useGetAllBoardingPassesQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  })

  const boardingPassData = paginatedData?.data || []
  const totalCount = paginatedData?.total || 0
  const totalPages = Math.ceil(totalCount / limit)

  useEffect(() => {
    console.log("Filters updated in BoardingPass.jsx:", filters)
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
    console.log("Received filters in BoardingPass.jsx:", filterObj)

    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && key !== '_refresh') {
        newFilters[key] = value
      }
    })

    console.log("Applying filters in BoardingPass.jsx:", newFilters)
    setFilters(newFilters)
  }, [])

  // Updated counts to match boarding pass data
  const passengerIdCount = getUniqueCount(boardingPassData, "passenger_id")
  const bookingLegIdCount = getUniqueCount(boardingPassData, "booking_leg_id")
  const seatCount = getUniqueCount(boardingPassData, "seat")

  return (
    <main className="flex-1 p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Plane className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Boarding Passes</h1>
              {/* <p className="text-gray-500 mt-1">Total Records: {isLoading ? "Loading..." : totalCount}</p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Boarding Passes</p>
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
                <p className="text-sm font-medium text-gray-500">Passengers</p>
                <p className="text-2xl font-semibold mt-1">{isLoading ? "—" : passengerIdCount}</p>
              </div>
              <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Booking Legs</p>
                <p className="text-2xl font-semibold mt-1">{isLoading ? "—" : bookingLegIdCount}</p>
              </div>
              <div className="bg-purple-100 h-12 w-12 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Seats</p>
                <p className="text-2xl font-semibold mt-1">{isLoading ? "—" : seatCount}</p>
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
          data={boardingPassData}
          isLoading={isLoading || isFetching}
          isFetching={isFetching}
          error={isError ? error?.message || error?.data?.message || "Unknown error" : null}
          offset={offset}
          setOffset={handlePageChange}
          recordsPerPage={limit}
          totalRecords={totalCount}
          totalPages={totalPages}
          onFilterChange={handleFilterChange} // Uncommented and added back
          initialFilters={filters}
        />
      </div>
    </main>
  )
}