'use client'
import React, { useState } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Add_Box from '@/components/data/add-data';
import DashboardTopper from '@/components/insights/quick-insights';
import TransactionBox, { Revenue } from '@/components/data/transactions';
const App = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([

    {
      amount: 1000,
      date: new Date('2023-01-01'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category2', value: 'Value2' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:1
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:2
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:3
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:4
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:5
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:6
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:7
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:8
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:9
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:10
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:11
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:12
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:13
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:14
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:15
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
      payment_id:16
    },
    {
      amount: -800, // Make the amount negative for expenses
      date: new Date('2023-03-10'),
      categories: [
        { key: 'Category2', value: 'Value2' },
        { key: 'Category4', value: 'Value4' },
      ],
      type: 'expense', // This one is an expense
      payment_id:17
    }
    
  ]);

  const updateRevenues = (newRevenues: Revenue[]) => { // Define a function to update this mockRevenue list
    setRevenues(newRevenues);
  };
  
  return (
    <ChakraProvider>
      <main>
       
        <Navbar />
        <DashboardTopper revenueList={revenues}/>
        <TransactionBox revenueList={revenues} onEdit={updateRevenues}/>
      </main>
    </ChakraProvider>
  );
};

export default App;
