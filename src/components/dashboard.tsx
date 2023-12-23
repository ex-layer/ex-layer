// components/DashboardTopper.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Flex, Box, Stat, StatLabel, StatNumber, StatHelpText, useColorMode, Slider } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const generateRandomProfitsData = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000));
};

const DashboardTopper: React.FC = () => {
  const { colorMode } = useColorMode();
  const [profits, setProfits] = useState<number[]>([]);
  const [timeScale, setTimeScale] = useState<number>(12);

  useEffect(() => {
    setProfits(generateRandomProfitsData());
  }, []);

  const textColor = colorMode === 'light' ? 'black' : 'white';

  const data = {
    labels: Array.from({ length: timeScale }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Profits Over Time',
        data: profits.slice(0, timeScale),
        borderColor: '#8BC34A', // Lighter green color
        backgroundColor: '#68D391', // Lighter green background
      },
    ],
  };

  const options = {
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

  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row' }}
      p={4}
      bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'}
      borderRadius="md"
      boxShadow="md"
      align="left"
      justify={{ base: 'flex-start', md: 'space-between' }}
    >
      <Box width={{ base: '100%', md: '45%' }} p={4} bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'} borderRadius="md" boxShadow="md" mb={{ base: '4', md: '0' }}>
        <Stat>
          <StatLabel color="#37474F">Most Sold Categories</StatLabel>
          <StatNumber color={textColor}>{mostSoldCategories.join(', ')}</StatNumber>
          <StatHelpText color="#607D8B">Top categories in sales</StatHelpText>
        </Stat>

        <Stat mt={4}>
          <StatLabel color="#37474F">Change in Revenue</StatLabel>
          <StatNumber color={textColor}>${changeInRevenue}</StatNumber>
          <StatHelpText color="#607D8B">Compared to the previous period</StatHelpText>
        </Stat>

        <Stat mt={4}>
          <StatLabel color="#37474F">Change in Expenses</StatLabel>
          <StatNumber color={textColor}>${changeInExpenses}</StatNumber>
          <StatHelpText color="#607D8B">Compared to the previous period</StatHelpText>
        </Stat>
      </Box>

      <Box width={{ base: '100%', md: '50%' }} p={4} bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'} borderRadius="md" boxShadow="md" mb={{ base: '4', md: '0' }}>
        <Box height="100%">
          <Line data={data} options={options} height={null} />
          <Slider
            aria-label="Time Scale Slider"
            min={1}
            max={profits.length}
            defaultValue={timeScale}
            onChange={(value) => setTimeScale(value)}
            mt={2}
            colorScheme="green"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardTopper;
