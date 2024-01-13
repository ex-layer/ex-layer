// File: quick-stats.tsx
// Description: This file contains the DashboardStats component, which is responsible for rendering
// and calculating quick stats. Later on, we should make this component customizable. 

// components/DashboardStats.tsx
import React, { useState } from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText, useColorMode, ButtonGroup, Button } from '@chakra-ui/react';
import { Revenue } from '../data/transactions';

interface DashboardStatsProps {
  revenueList: Revenue[];
}

const DashboardStats = (props: DashboardStatsProps) => {
  const { revenueList } = props;
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';
  const outlineColor = isLightMode ? 'black' : 'white';
  const textColor = isLightMode ? 'black' : 'white';

  const [selectedPeriod, setSelectedPeriod] = useState('All Time');

  // Calculate most sold categories and their total values
  const mostSoldCategories: Map<string, number> = new Map();
  revenueList.forEach((revenue) => {
    if (revenue.type === 'revenue') {
      revenue.categories.forEach((category: { key: string; value: string }) => {
        const { key, value } = category;
        const currentValue = mostSoldCategories.get(value) || 0;
        mostSoldCategories.set(value, currentValue + (revenue.amount || 0));
      });
    }
  });

  // Sort categories based on total values in descending order
  const sortedCategories = [...mostSoldCategories.entries()]
    .sort(([, valueA]: [string, number], [, valueB]: [string, number]) => valueB - valueA)
    .map(([category]: [string, number]) => category);

  const calculateChange = () => {
    let totalRevenue = 0;
    let totalExpenses = 0;
    let profit = 0;

    const currentDate = new Date();

    revenueList.forEach((revenue) => {
      if (revenue.date) { // Check if date is not null
        const revenueDate = new Date(revenue.date);

        switch (selectedPeriod) {
          case 'Last Month':
            if (revenueDate.getMonth() === currentDate.getMonth() - 1 && revenueDate.getFullYear() === currentDate.getFullYear()) {
              updateTotals();
            }
            break;
          case 'Last Week':
            const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (revenueDate >= oneWeekAgo) {
              updateTotals();
            }
            break;
          case 'Today':
            if (revenueDate.toDateString() === currentDate.toDateString()) {
              updateTotals();
            }
            break;
          default:
            // All Time
            updateTotals();
            break;
        }
      }

      function updateTotals() {
        const amount = Math.abs(revenue.amount || 0); // Make the amount positive

        if (revenue.type === 'revenue') {
          totalRevenue += amount;
        } else if (revenue.type === 'expense') {
          totalExpenses += amount;
        }
      }
    });

    profit = totalRevenue - totalExpenses;

    return { totalRevenue, totalExpenses, profit };
  };
  const { totalRevenue, totalExpenses, profit } = calculateChange();

  return (
<Box
  width={{ base: '100%', md: '48%' }}
  p={4}
  borderRadius="1xl"
  boxShadow="md"
  mb={{ base: '4', md: '0' }}
  borderColor={outlineColor}
>
  <ButtonGroup
    mb={{ base: 4, md: 0 }}
    isAttached
    variant="outline"
    colorScheme="teal"
    flexDirection={{ base: 'row', md: 'row' }}
    justifyContent="space-between"
    flexWrap="wrap" // Added to allow wrapping on smaller screens
  >
    <Button
      onClick={() => setSelectedPeriod('All Time')}
      flex={{ base: '1', md: 'auto' }} // Adjusted flex for better responsiveness
      fontSize={{ base: 'xs', md: 'sm' }} // Adjusted font size for responsiveness
    >
      All Time
    </Button>
    <Button
      onClick={() => setSelectedPeriod('Last Month')}
      flex={{ base: '1', md: 'auto' }}
      fontSize={{ base: 'xs', md: 'sm' }}
    >
      Last Month
    </Button>
    <Button
      onClick={() => setSelectedPeriod('Last Week')}
      flex={{ base: '1', md: 'auto' }}
      fontSize={{ base: 'xs', md: 'sm' }}
    >
      Last Week
    </Button>
    <Button
      onClick={() => setSelectedPeriod('Today')}
      flex={{ base: '1', md: 'auto' }}
      fontSize={{ base: 'xs', md: 'sm' }}
    >
      Today
    </Button>
  </ButtonGroup>

      <Stat mt={8}>
        <StatLabel fontSize="lg" fontWeight="bold" color={textColor}>
          Profit ({selectedPeriod})
        </StatLabel>
        <StatNumber fontSize="2xl" color={textColor}>
          ${profit}
        </StatNumber>
        <StatHelpText color={textColor}>Total profit over the selected period</StatHelpText>
      </Stat>

      <Stat mt={8}>
        <StatLabel fontSize="lg" fontWeight="bold" color={textColor}>
          Change in Revenue ({selectedPeriod})
        </StatLabel>
        <StatNumber fontSize="2xl" color={textColor}>
          ${totalRevenue}
        </StatNumber>
        <StatHelpText color={textColor}>Compared to all previous periods</StatHelpText>
      </Stat>

      <Stat mt={8}>
        <StatLabel fontSize="lg" fontWeight="bold" color={textColor}>
          Change in Expenses ({selectedPeriod})
        </StatLabel>
        <StatNumber fontSize="2xl" color={textColor}>
          ${Math.abs(totalExpenses)}
        </StatNumber>
        <StatHelpText color={textColor}>Compared to all previous periods</StatHelpText>
      </Stat>

      {/* Moved Most Sold Categories to the end */}
      <Stat mt={8}>
        <StatLabel fontSize="lg" fontWeight="bold" color={textColor}>
          Most Sold Categories
        </StatLabel>
        <StatNumber fontSize="2xl" color={textColor}>
          {sortedCategories.join(', ')}
        </StatNumber>
        <StatHelpText color={textColor}>Top categories in sales</StatHelpText>
      </Stat>
    </Box>
  );
};

export default DashboardStats;