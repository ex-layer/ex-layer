import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Add_Box from '@/components/add_box';
import Minus_Box from '@/components/minus_box';
import DashboardTopper from '@/components/dashboard';
import TransactionBox from '@/components/transactions';
const App = () => {
  const mockRevenues = [
    {
      amount: '1000',
      date: new Date('2023-01-01'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category2', value: 'Value2' },
      ],
    },
    {
      amount: '1500',
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
    },
    {
      amount: '800',
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
    },
    {
      amount: '1500',
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
    },
    {
      amount: '800',
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
    },
    {
      amount: '1500',
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
    },
    {
      amount: '800',
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
    }
  ];
  return (
    <ChakraProvider>
      <main>
        <Navbar />
        <DashboardTopper/>
        <TransactionBox revenueList={mockRevenues}/>
        <Flex justify="space-between" p={8}>
          <Add_Box />
          <Minus_Box />
        </Flex>
      </main>
    </ChakraProvider>
  );
};

export default App;
