// components/DashboardTopper.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Flex, Box, Stat, Text , StatLabel, StatNumber, StatHelpText, useColorMode, Slider, Select, useColorModeValue, Link } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import Chart from 'react-apexcharts';
import DashboardStats from './dashboard_stats';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Revenue } from './transactions';

const DashboardTopper: React.FC<{ revenueList: Revenue[] }> = ({ revenueList }) => {
  const { colorMode } = useColorMode();
  
  const [timeScale, setTimeScale] = useState<number>(12);

  const textColor = colorMode === 'light' ? 'black' : 'white';

  // Ensure that revenueList is not undefined or null before using slice
  const slicedRevenueList = revenueList ? revenueList.slice(0, timeScale) : [];
  console.log('revenueList:', revenueList);
  console.log('slicedRevenueList:', slicedRevenueList);
  const chartOptions = {
    chart: {
      fontFamily: 'Jost, sans-serif', // Specify the font family with fallback
      background: 'transparent',
    },
    tooltip: {
      theme: colorMode === 'light' ? 'light' : 'dark',
      style: {
        fontSize: '14px',
      },
    },
    colors: [colorMode === 'light' ? '#68D391' : '#8BC34A'],
    xaxis: {
      categories: slicedRevenueList.map((revenue) => revenue.date?.toLocaleDateString() ?? ''),
      title: {
        
        text: 'Months',
        style: {
          color: colorMode === 'light' ? 'black' : 'white',
          fontSize: '14px',
        },
      },
      labels: {
        show: !(window.innerWidth <= 480),
        style: {
          colors: colorMode === 'light' ? 'black' : 'white',
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Profits',
        style: {
          color: colorMode === 'light' ? 'black' : 'white',
          fontSize: '14px',
        },
      },
      labels: {
        show:  !(window.innerWidth <= 480),
        style: {
          colors: colorMode === 'light' ? 'black' : 'white',
          fontSize: '14px',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    responsive: [
      {
        breakpoint: 480, // Adjust the breakpoint as needed
        options: {
          chart: {
            height: 300, // Adjust the height for smaller screens
          },
        },
      },
    ],
    maintainAspectRatio: false, // Disable maintaining aspect ratio
  };
  
  const series = [
    {
      name: 'Profits Over Time',
      data: slicedRevenueList.map((revenue) => revenue.amount),
    },
  ];
  const cardBackgroundColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.600');


  return (
    <main>
         <Box
         borderWidth="1px"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="lg"
         borderColor={cardBorderColor}
         bg={cardBackgroundColor}
         m={4}
         >

<      Box>
        <Flex align="center">
          <Text p={4} fontSize="3xl" fontWeight="bold">
            Quick Insights
          </Text>
          <Box ml={1}>
            <Link
              href="#your-link-url" // Replace with the actual link URL
              _hover={{ textDecoration: 'none', color: 'teal.500', transition: 'color 0.3s ease' }} // Remove underline on hover
              display="inline-block"
            >
              <Text fontSize="sm" borderBottom="2px" display="inline" >
                see more
              </Text>
            </Link>
            <Box as={FaLongArrowAltRight} display="inline" ml={2} />
          </Box>
        </Flex>
      </Box>

      
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        position="relative"
        p={4}
        bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'}
        borderRadius="md"
        align="left"
        justify={{ base: 'flex-start', md: 'space-between' }}
      >
        <DashboardStats revenueList={revenueList} />

        <Box
          width={{ base: '100%', md: '50%' }}
          p={4}
          bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'}
          borderRadius="1xl"
          boxShadow="md"
          mb={{ base: '4', md: '0' }}
          position="relative"
          borderColor={colorMode === 'light' ? 'black' : 'white'}
        >
          <Chart options={chartOptions} series={series} type="line" height={350} />
        </Box>
      </Flex>
      </Box>
    </main>
  
  );
};

export default DashboardTopper;