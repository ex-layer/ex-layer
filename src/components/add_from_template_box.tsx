import React, { useState } from 'react';
import { Box, Text, Button, Flex, Input, IconButton, Stack } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Revenue } from './transactions';

type RevenueListProps = {
  revenueList: Revenue[];
  newList: Revenue[];
  setNewList: React.Dispatch<React.SetStateAction<Revenue[]>>;
};

const AddFromTemplate: React.FC<RevenueListProps> = ({ revenueList, newList, setNewList }) => {
    const [selectedRevenues, setSelectedRevenues] = useState<Record<number, number>>({});
  
    const handleToggleSelection = (index: number) => {
      setSelectedRevenues((prevSelected) => {
        const updatedSelected = { ...prevSelected };
        if (!updatedSelected[index]) {
          updatedSelected[index] = updatedSelected[index] !== undefined ? updatedSelected[index] : 0; // Set default value to 0
        }
        return updatedSelected;
      });
    };
  
    const handleQuantityChange = (index: number, newQuantity: number) => {
      setSelectedRevenues((prevSelected) => ({
        ...prevSelected,
        [index]: newQuantity !== undefined ? newQuantity : 0, // Set default value to 0
      }));
    };
  
    const handleAddToNewList = () => {
      Object.entries(selectedRevenues).forEach(([index, qty]) => {
        const selectedIndex = parseInt(index, 10);
        const selectedRevenue = revenueList[selectedIndex];
        const newItem = { ...selectedRevenue, quantity: qty };
        setNewList((prevList) => [...prevList, newItem]);
      });
  
      // Reset selections after adding to the new list
      setSelectedRevenues({});
    };
  
    const handleEdit = (revenue: Revenue) => {
      // Placeholder function for editing
      console.log(`Edit: ${JSON.stringify(revenue)}`);
    };
  
    const handleDelete = (revenue: Revenue) => {
      // Placeholder function for deleting
      console.log(`Delete: ${JSON.stringify(revenue)}`);
    };
  
    return (
      <Box p={6} borderWidth="1px" borderRadius="lg">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Available List
        </Text>
        <Stack spacing={4}>
          {revenueList.map((revenue, index) => (
            <Flex
              key={index}
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              onClick={() => handleToggleSelection(index)}
              p={2}
              bg={selectedRevenues[index] ? 'gray.100' : 'transparent'}
              _hover={{ bg: 'gray.50' }}
            >
              <Box flex="1">
                {revenue.categories.map((category) => `${category.key}: ${category.value}, `)}
                Amount: {revenue.amount}, Date: {revenue.date.toLocaleDateString()}, Type: {revenue.type}
              </Box>
              <Flex alignItems="center">
                <Input
                  type="number"
                  min={0}
                  value={selectedRevenues[index] || ''}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                  w="50px"
                  mr={2}
                />
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Edit"
                  onClick={() => handleEdit(revenue)}
                  variant="outline"
                  colorScheme="teal"
                  size="sm"
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Delete"
                  onClick={() => handleDelete(revenue)}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                />
              </Flex>
            </Flex>
          ))}
        </Stack>
        <Flex align="center" mt={4}>
          <Button onClick={handleAddToNewList} disabled={Object.values(selectedRevenues).every((qty) => qty <= 0)} size="md">
            Add to New List
          </Button>
        </Flex>
      </Box>
    );
  };
  
  export default AddFromTemplate;