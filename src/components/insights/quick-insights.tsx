// File: quick-insights.tsx
// Description: This file contains the DashboardTopper component, which renders all info for
// the quick insights section. revenueList is passed in, and when it changes, 

'use client'
import React from 'react';
import { Flex, Box, Text, useColorMode, useColorModeValue, Link } from '@chakra-ui/react';
import ProfitChart from './quick-chart';
import DashboardStats from './quick-stats';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Revenue } from '../data/transactions';

interface DashboardTopperProps {
  revenueList: Revenue[]
}

const DashboardTopper = (props : DashboardTopperProps) => {
  const { revenueList } = props
  const { colorMode } = useColorMode();

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
          <ProfitChart revenueList = {revenueList} />
        </Box>
      </Flex>
      </Box>
    </main>
  
  );
};

export default DashboardTopper;