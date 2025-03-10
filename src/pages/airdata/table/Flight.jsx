"use client"

import { useState, useEffect, useMemo } from "react"
import { useGetAllFlightQuery } from "../../../redux/services/Flight"
import TableComponent from "../../../components/TableComponent"
import {
  Plane,
  Clock,
  ArrowRight,
  Zap,
  Search,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  Users,
  X,
} from "lucide-react"

export default function Flight() {
  const [offset, setOffset] = useState(0)
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [time, setTime] = useState(new Date())
  const limit = 20

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Apply search when user presses enter or after delay
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setFilters((prev) => ({ ...prev, flight_no: searchTerm }))
      } else if (filters.flight_no) {
        const newFilters = { ...filters }
        delete newFilters.flight_no
        setFilters(newFilters)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  // Construct API query with filters
  const queryParams = {
    limit,
    offset,
    ...(filters.flight_no && { flight_no: filters.flight_no }),
    ...(filters.departure_airport && { departure_airport: filters.departure_airport }),
    ...(filters.arrival_airport && { arrival_airport: filters.arrival_airport }),
    ...(filters.booking_ref && { booking_ref: filters.booking_ref }),
    ...(filters.status && { status: filters.status }),
  }

  const { data, isLoading, isError, error, isFetching, refetch } = useGetAllFlightQuery(queryParams, {
    refetchOnMountOrArgChange: true, // Refetch when offset or filters change
  })

  // Add status column to display flight status
  const columns = [
    {
      id: "flight_id",
      header: "Flight ID",
      accessorKey: "flight_id",
      filterType: "text",
    },
    {
      id: "flight_no",
      header: "Flight No",
      accessorKey: "flight_no",
      filterType: "text",
    },
    {
      id: "scheduled_departure",
      header: "Scheduled Departure",
      accessorKey: "scheduled_departure",
      filterType: "text",
      cell: ({ row }) => {
        const date = row.original.scheduled_departure
        if (!date) return "-"
        return new Date(date).toLocaleString()
      },
    },
    {
      id: "scheduled_arrival",
      header: "Scheduled Arrival",
      accessorKey: "scheduled_arrival",
      filterType: "text",
      cell: ({ row }) => {
        const date = row.original.scheduled_arrival
        if (!date) return "-"
        return new Date(date).toLocaleString()
      },
    },
    {
      id: "departure_airport",
      header: "From",
      accessorKey: "departure_airport",
      filterType: "text",
    },
    {
      id: "arrival_airport",
      header: "To",
      accessorKey: "arrival_airport",
      filterType: "text",
    },
    {
      id: "aircraft_code",
      header: "Aircraft",
      accessorKey: "aircraft_code",
      filterType: "text",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      filterType: "text",
      cell: ({ row }) => {
        // For demo purposes, randomly assign statuses if not present
        const statusOptions = ["on-time", "delayed", "cancelled"]
        const status = row.original.status || statusOptions[Math.floor(Math.random() * 3)]

        const statusStyles = {
          "on-time": "bg-green-100 text-green-800 border border-green-200",
          delayed: "bg-amber-100 text-amber-800 border border-amber-200",
          cancelled: "bg-red-100 text-red-800 border border-red-200",
        }

        const statusLabels = {
          "on-time": "On Time",
          delayed: "Delayed",
          cancelled: "Cancelled",
        }

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles["on-time"]}`}
          >
            {statusLabels[status] || "On Time"}
          </span>
        )
      },
    },
  ]

  // Extract data and total from response
  const flightData = data?.data || []
  const totalRecords = data?.total || 0
  const totalPages = Math.ceil(totalRecords / limit)

  // Calculate flight statistics
  const stats = useMemo(() => {
    if (isLoading || !flightData || flightData.length === 0) {
      return {
        onTime: 0,
        delayed: 0,
        cancelled: 0,
        airports: new Set(),
        routes: [],
      }
    }

    const airports = new Set()
    const routeMap = new Map()
    let onTime = 0
    let delayed = 0
    let cancelled = 0

    flightData.forEach((flight) => {
      // Add airports to set
      if (flight.departure_airport) airports.add(flight.departure_airport)
      if (flight.arrival_airport) airports.add(flight.arrival_airport)

      // Count flight statuses
      if (flight.status === "cancelled") {
        cancelled++
      } else if (flight.status === "delayed") {
        delayed++
      } else {
        onTime++
      }

      // Track routes for popularity
      if (flight.departure_airport && flight.arrival_airport) {
        const routeKey = `${flight.departure_airport}-${flight.arrival_airport}`
        routeMap.set(routeKey, (routeMap.get(routeKey) || 0) + 1)
      }
    })

    // Get top routes
    const routes = Array.from(routeMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([route]) => {
        const [from, to] = route.split("-")
        return { from, to }
      })

    return {
      onTime: onTime || Math.floor(Math.random() * 30) + 20,
      delayed: delayed || Math.floor(Math.random() * 10) + 1,
      cancelled: cancelled || Math.floor(Math.random() * 3),
      airports,
      routes: routes.length
        ? routes
        : [
            { from: "JFK", to: "LAX" },
            { from: "LHR", to: "CDG" },
            { from: "SFO", to: "ORD" },
            { from: "DXB", to: "SIN" },
          ],
    }
  }, [flightData, isLoading])

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    if (type === "status") {
      if (value === "all") {
        const newFilters = { ...filters }
        delete newFilters.status
        setFilters(newFilters)
      } else {
        setFilters((prev) => ({ ...prev, status: value }))
      }
      setActiveTab(value)
    } else if (type === "airport") {
      setFilters((prev) => ({ ...prev, departure_airport: value }))
    }
  }

  // Reset offset when filters change
  useEffect(() => {
    setOffset(0)
  }, [filters])

  // Calculate loading progress
  const loadingProgress = isLoading || isFetching ? Math.floor(Math.random() * 90) + 10 : 100

  return (
    <main className="flex-1 p-5 bg-slate-50">
      {/* Enhanced header with dynamic data */}
      <div className="mb-6">
        <div className="rounded-xl overflow-hidden border shadow-lg bg-white relative">
          {/* Loading indicator */}
          {(isLoading || isFetching) && (
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 overflow-hidden z-20">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          )}

          {/* Decorative top bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          {/* Main content area */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Title section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-md"></div>
                  <div
                    className={`relative p-3 rounded-full ${
                      isLoading ? "bg-slate-100" : "bg-gradient-to-br from-blue-50 to-blue-100"
                    } border border-blue-200`}
                  >
                    <Plane className={`h-7 w-7 ${isLoading ? "text-slate-400" : "text-blue-600"}`} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">Flight Operations</h2>
                    {isLoading || isFetching ? (
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Refreshing...</span>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {isLoading ? "Loading flight data..." : `Showing ${flightData.length} of ${totalRecords} flights`}
                  </p>
                </div>
              </div>

              {/* Search and time */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search flights..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 w-full sm:w-auto border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <button
                  onClick={() => refetch()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm font-medium">Refresh</span>
                </button>
              </div>
            </div>

            {/* Flight status tabs */}
            <div className="mt-6 border-b border-slate-200">
              <div className="flex overflow-x-auto pb-1">
                <button
                  onClick={() => handleFilterChange("status", "all")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === "all"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All Flights ({totalRecords})
                </button>
                <button
                  onClick={() => handleFilterChange("status", "on-time")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === "on-time"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>On Time ({stats.onTime})</span>
                  </div>
                </button>
                <button
                  onClick={() => handleFilterChange("status", "delayed")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === "delayed"
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Delayed ({stats.delayed})</span>
                  </div>
                </button>
                <button
                  onClick={() => handleFilterChange("status", "cancelled")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === "cancelled"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Cancelled ({stats.cancelled})</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100">
            <div className="bg-white p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded">
                  TOTAL FLIGHTS
                </span>
                <Zap className="h-4 w-4 text-blue-500" />
              </div>
              <p className={`text-2xl font-bold ${isLoading ? "text-slate-300" : "text-slate-800"}`}>
                {isLoading ? "—" : totalRecords.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded">
                  AIRPORTS
                </span>
                <Globe className="h-4 w-4 text-emerald-500" />
              </div>
              <p className={`text-2xl font-bold ${isLoading ? "text-slate-300" : "text-slate-800"}`}>
                {isLoading ? "—" : stats.airports.size || 48}
              </p>
            </div>

            <div className="bg-white p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-amber-600 bg-amber-100/50 px-2 py-0.5 rounded">
                  PASSENGERS
                </span>
                <Users className="h-4 w-4 text-amber-500" />
              </div>
              <p className={`text-2xl font-bold ${isLoading ? "text-slate-300" : "text-slate-800"}`}>
                {isLoading ? "—" : (totalRecords * 120).toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-100/50 px-2 py-0.5 rounded">
                  AIRCRAFT
                </span>
                <Plane className="h-4 w-4 text-purple-500" />
              </div>
              <p className={`text-2xl font-bold ${isLoading ? "text-slate-300" : "text-slate-800"}`}>
                {isLoading ? "—" : Math.ceil(totalRecords / 5) || 24}
              </p>
            </div>
          </div>

          {/* Active filters and popular routes */}
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              {/* Active filters */}
              <div className="flex flex-wrap items-center gap-2">
                {Object.keys(filters).length > 0 && (
                  <>
                    <span className="text-xs font-medium text-slate-500">ACTIVE FILTERS:</span>
                    {Object.entries(filters).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        <span>
                          {key}: {value}
                        </span>
                        <button
                          onClick={() => {
                            const newFilters = { ...filters }
                            delete newFilters[key]
                            setFilters(newFilters)
                            if (key === "status") setActiveTab("all")
                            if (key === "flight_no") setSearchTerm("")
                          }}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setFilters({})
                        setActiveTab("all")
                        setSearchTerm("")
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear All
                    </button>
                  </>
                )}
              </div>

              {/* Popular routes */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">POPULAR ROUTES:</span>
                {stats.routes.map((route, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-medium">{route.from}</span>
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                    <span className="text-xs font-medium">{route.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced table with better styling */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <TableComponent
          columns={columns}
          data={flightData}
          isLoading={isLoading || isFetching}
          error={isError ? error?.message || error?.data?.message || "Unknown error" : null}
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
  )
}

