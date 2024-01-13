'use client'
import React, { useState } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Add_Box from '@/components/data/add-data';
import DashboardTopper from '@/components/insights/quick-insights';
import TransactionBox, { Revenue } from '@/components/data/transactions';
const App = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([

  ]);

  const updateRevenues = (newRevenues: Revenue[]) => { // Define a function to update this mockRevenue list
    setRevenues(newRevenues);
  };
  const handleDelete = (deletedId: number) => {
    // Filter out the item with the specified payment_id
    const updatedList = revenues.filter((item) => item.payment_id !== deletedId);
    setRevenues(updatedList);
  };

  const handleAdd = (newRevenue: Revenue) => {
    // Add the new revenue object to the existing list
    const updatedList = [...revenues, newRevenue];

    // Update the state with the new list
    setRevenues(updatedList);
  };

  return (
    <ChakraProvider>
      <main>
       
        <Navbar />
        <DashboardTopper revenueList={revenues}/>
        <TransactionBox revenueList={revenues} onEdit={updateRevenues} onDelete={handleDelete} handleAdd = {handleAdd}/>
      </main>
    </ChakraProvider>
  );
};

export default App;
