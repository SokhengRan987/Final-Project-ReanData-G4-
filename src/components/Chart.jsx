// Chart.js
import React from 'react';
import PropTypes from 'prop-types';  // Optional, but helps with type checking
import { BarChart } from '@mui/x-charts/BarChart';
import { useResizeDetector } from 'react-resize-detector';

const Chart = ({ xAxisData, seriesData, height, width}) => {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]} // Dynamic x-axis
      series={seriesData}  // Dynamic series
      width={width}
      height={height}
    />
  );
};

// Prop validation (Optional but useful)
Chart.propTypes = {
  xAxisData: PropTypes.array.isRequired,  // x-axis data (e.g., continent names, categories)
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.array.isRequired,  // Data points for the series
      label: PropTypes.string.isRequired,  // Label for the series (e.g., 'Countries Served')
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};


export default Chart;
