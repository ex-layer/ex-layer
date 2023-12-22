// components/DashboardTopper.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Flex, Box, Heading, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const generateRandomProfitsData = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10000));
};

const DashboardTopper: React.FC = () => {
  const [profits, setProfits] = useState<number[]>([]);
  const [timeScale, setTimeScale] = useState<number>(12); // Initial time scale

  useEffect(() => {
    setProfits(generateRandomProfitsData());
  }, []); // Run the effect only once after the initial render

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
      },
    },
  };

  // Placeholder data for additional widgets
  const mostSoldCategories = ['Category A', 'Category B', 'Category C'];
  const changeInRevenue = 1500; // Example change in revenue
  const changeInExpenses = -800; // Example change in expenses

  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row' }} // Stack on small screens with chart at the bottom, row on medium screens and above
      p={4}
      bg="#F9FAF9" // Lighter background
      borderRadius="md"
      boxShadow="md"
      align="left" // Align text and chart to the left
      justify={{ base: 'flex-start', md: 'space-between' }} // Space between widgets on medium screens and above
    >
      {/* Widget Section */}
      <Box width={{ base: '100%', md: '45%' }} p={4} bg="#FFFFFF" borderRadius="md" boxShadow="md" mb={{ base: '4', md: '0' }}>
        {/* Most Sold Categories */}
        <Stat>
          <StatLabel color="#37474F">Most Sold Categories</StatLabel>
          <StatNumber color="black">{mostSoldCategories.join(', ')}</StatNumber>
          <StatHelpText color="#607D8B">Top categories in sales</StatHelpText>
        </Stat>

        {/* Change in Revenue */}
        <Stat mt={4}>
          <StatLabel color="#37474F">Change in Revenue</StatLabel>
          <StatNumber color="black">${changeInRevenue}</StatNumber>
          <StatHelpText color="#607D8B">Compared to the previous period</StatHelpText>
        </Stat>

        {/* Change in Expenses */}
        <Stat mt={4}>
          <StatLabel color="#37474F">Change in Expenses</StatLabel>
          <StatNumber color="black">${changeInExpenses}</StatNumber>
          <StatHelpText color="#607D8B">Compared to the previous period</StatHelpText>
        </Stat>
      </Box>

      <Box width={{ base: '100%', md: '50%' }} p={4} bg="#FFFFFF" borderRadius="md" boxShadow="md" mb={{ base: '4', md: '0' }}>
        {/* Chart Section */}
        <Box height="100%"> {/* Set height to 100% */}
          <Line data={data} options={options} height={null} />
          <Slider
            aria-label="Time Scale Slider"
            min={1}
            max={profits.length}
            defaultValue={timeScale}
            onChange={(value) => setTimeScale(value)}
            mt={2} // Different color for the slider
            colorScheme="green"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              boxSize={3} // Set the size of the thumb
              bg="black" // Black color for the thumb
            />
          </Slider>
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardTopper;
