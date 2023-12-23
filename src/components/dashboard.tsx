// components/DashboardTopper.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Flex, Box, Stat, StatLabel, StatNumber, StatHelpText, useColorMode, Slider, Select } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DashboardStats from './dashboard_stats';

Chart.register(...registerables);

const DashboardTopper: React.FC<{ revenueList: Revenue[] }> = ({ revenueList }) => {
  const { colorMode } = useColorMode();
  const [timeScale, setTimeScale] = useState<number>(12);

  const textColor = colorMode === 'light' ? 'black' : 'white';

  // Ensure that revenueList is not undefined or null before using slice
  const slicedRevenueList = revenueList ? revenueList.slice(0, timeScale) : [];
  console.log('revenueList:', revenueList);
  console.log('slicedRevenueList:', slicedRevenueList);

  const data = {
    labels: slicedRevenueList.map((revenue) => revenue.date?.toLocaleDateString() ?? ''),
    datasets: [
      {
        label: 'Profits Over Time',
        data: slicedRevenueList.map((revenue) => revenue.amount), // Make sure 'amount' is a number
        borderColor: '#8BC34A', // Lighter green color
        backgroundColor: '#68D391', // Lighter green background
      },
    ],
  };

  const options = {
    plugins: {  
      legend: {
        labels: {
          color: colorMode === 'light' ? 'black' : 'white',

          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Profits',
          color: colorMode === 'light' ? 'black' : 'white',
        },
        ticks: {
          color: colorMode === 'light' ? 'black' : 'white', // Set the color of the y-axis tickers
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months',
          color: colorMode === 'light' ? 'black' : 'white',
        },
        ticks: {
          color: colorMode === 'light' ? 'black' : 'white', // Set the color of the x-axis tickers
        },
      },
    },
  };

  const mostSoldCategories = ['Category A', 'Category B', 'Category C'];
  const changeInRevenue = 1500;
  const changeInExpenses = -800;

  const handleTimelineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeline = parseInt(event.target.value, 10);
    setTimeScale(selectedTimeline);
  };

  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row' }}
      position='relative'
      p={4}
      bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'}
      borderRadius="md"
      boxShadow="md"
      align="left"
      justify={{ base: 'flex-start', md: 'space-between' }}
    >

        <DashboardStats revenueList={revenueList}/>
        <Box
        width={{ base: '100%', md: '50%' }}
        p={4}
        bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'}
        borderRadius="md"
        boxShadow="md"
        mb={{ base: '4', md: '0' }}
        position="relative"
      >
        <Box height="100%">
          <Line data={data} options={options} />
          
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardTopper;
