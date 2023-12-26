// File: quick-stats.tsx
// Description: This file contains the DashboardStats component, which is responsible for rendering
// and calculating quick stats. Later on, we should make this component customizable. 

import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText, useColorMode } from '@chakra-ui/react';
import { Revenue } from '../data/transactions';
interface DashboardStatsProps {
  revenueList: Revenue[]
}

const DashboardStats = (props : DashboardStatsProps) => {
  const {revenueList} = props
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';
  const outlineColor = isLightMode ? 'black' : 'white'; 
  const textColor = isLightMode ? 'black' : 'white';

  // Calculate most sold categories and their total values
  const mostSoldCategories: Map<string, number> = new Map();
  revenueList.forEach((revenue) => {
    revenue.categories.forEach((category: { key: string; value: string }) => {
      const { key, value } = category;
      const currentValue = mostSoldCategories.get(value) || 0;
      mostSoldCategories.set(value, currentValue + (revenue.amount || 0));
    });
  });

  // Sort categories based on total values in descending order
  const sortedCategories = [...mostSoldCategories.entries()]
  .sort(([, valueA]: [string, number], [, valueB]: [string, number]) => valueB - valueA)
  .map(([category]: [string, number]) => category);

  const calculateChange = () => {
    let totalRevenue = 0;
    let totalExpenses = 0;
  
    revenueList.forEach((revenue) => {
      const amount = Math.abs(revenue.amount || 0); // Make the amount positive
  
      if (revenue.type === 'revenue') {
        totalRevenue += amount;
      } else if (revenue.type === 'expense') {
        totalExpenses += amount;
      }
    });
  
    return { totalRevenue, totalExpenses };
  };
  
  const { totalRevenue, totalExpenses } = calculateChange();
  
  return (
    <Box
      width={{ base: '100%', md: '48%' }}
      p={4}
      borderRadius="1xl"
      boxShadow="md"
      mb={{ base: '4', md: '0' }}
      borderColor={outlineColor} // Set outline color dynamically
      // borderWidth="1px" // Added a thick border
    >
      <Stat>
        <StatLabel fontSize="lg" fontWeight="bold" color={textColor}>
          Most Sold Categories
        </StatLabel>
        <StatNumber fontSize="2xl" color={textColor}>
          {sortedCategories.join(', ')}
        </StatNumber>
        <StatHelpText color={textColor}>Top categories in sales</StatHelpText>
      </Stat>

      <Stat mt={8}>
        <StatLabel fontSize="lg" fontWeight="bold" color={textColor}>
          Change in Revenue (All Time)
        </StatLabel>
        <StatNumber fontSize="2xl" color={textColor}>
          ${totalRevenue}
        </StatNumber>
        <StatHelpText color={textColor}>Compared to all previous periods</StatHelpText>
      </Stat>

      <Stat mt={8}>
        <StatLabel fontSize="lg" fontWeight="bold" color={textColor}>
          Change in Expenses (All Time)
        </StatLabel>
        <StatNumber fontSize="2xl" color={textColor}>
          ${Math.abs(totalExpenses)}
        </StatNumber>
        <StatHelpText color={textColor}>Compared to all previous periods</StatHelpText>
      </Stat>
    </Box>
  );
};

export default DashboardStats;
