'use client'
import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText, useColorMode } from '@chakra-ui/react';
import { Revenue } from './transactions';

const DashboardStats: React.FC<{ revenueList: Revenue[] }> = ({ revenueList }) => {
    const { colorMode } = useColorMode();
    const textColor = colorMode === 'light' ? 'black' : 'white';
  
    // Calculate most sold categories and their total values
    const mostSoldCategories: Map<string, number> = new Map();
    revenueList.forEach((revenue) => {
      revenue.categories.forEach((category: { key: string; value: string }) => {
        const { key, value } = category;
        const currentValue = mostSoldCategories.get(value) || 0;
        mostSoldCategories.set(value, currentValue + parseFloat(revenue.amount) || 0);
      });
    });
  
    // Sort categories based on total values in descending order
    const sortedCategories = [...mostSoldCategories.entries()]
      .sort(([, valueA], [, valueB]) => valueB - valueA)
      .map(([category]) => category);
  
    // Calculate change in revenue and expenses
    const calculateChange = () => {
      let totalRevenue = 0;
      let totalExpenses = 0;
  
      revenueList.forEach((revenue) => {
        totalRevenue += parseFloat(revenue.amount) || 0;
        // Assuming that expenses are represented as negative values in the amount property
        totalExpenses += Math.min(parseFloat(revenue.amount) || 0, 0);
      });
  
      return { totalRevenue, totalExpenses };
    };
  
    const { totalRevenue, totalExpenses } = calculateChange();
  
    return (
      <Box
        width={{ base: '100%', md: '45%' }}
        p={4}
        bg={colorMode === 'light' ? '#FFFFFF' : 'gray.800'}
        borderRadius="md"
        boxShadow="md"
        mb={{ base: '4', md: '0' }}
      >
        <Stat>
          <StatLabel color={textColor}>Most Sold Categories</StatLabel>
          <StatNumber color={textColor}>{sortedCategories.join(', ')}</StatNumber>
          <StatHelpText color={textColor}>Top categories in sales</StatHelpText>
        </Stat>
  
        <Stat mt={4}>
          <StatLabel color={textColor}>Change in Revenue (All Time)</StatLabel>
          <StatNumber color={textColor}>${totalRevenue}</StatNumber>
          <StatHelpText color={textColor}>Compared to all previous periods</StatHelpText>
        </Stat>
  
        <Stat mt={4}>
          <StatLabel color={textColor}>Change in Expenses (All Time)</StatLabel>
          <StatNumber color={textColor}>${Math.abs(totalExpenses)}</StatNumber>
          <StatHelpText color={textColor}>Compared to all previous periods</StatHelpText>
        </Stat>
      </Box>
    );
  };
  
  export default DashboardStats;
