import React from 'react'
import AirportStatisticsBarChart from '../../components/airdata/boardingPass/AirportStatisticsBarChart'
import PreCheckUsagePieChart from '../../components/airdata/boardingPass/PreCheckUsagePieChart'

export default function BoardingStatistics() {
  return (
    <>
    <section className='flex flex-col lg:flex-row'>
      <AirportStatisticsBarChart/>
      <PreCheckUsagePieChart/>
    </section>
    {/* Analysis and Story telling section */}
    <section className='mx-8 max-w-screen-xl w-min-[400px]'>
      {/* Analysis */}
      <h3 className='text-3xl mb-4'>Analysis</h3>
    <p> {/* Total Boardings */}
      Total Boardings: Indicates overall passengers activity.
    </p>
    <p>
      Unique Passengers: Show how many different passsengers are flying.
    </p>
    <p>
      Unique Flight Legs: Represents the different routes flown.
    </p>
    <p>
      Precheck Percentage: Highlights how many passengers are utilizing precheck for a smoother boarding process.
    </p>
    </section>
    </>
  )
}
