// RevenueList.tsx
'use client'
import React, { useState } from 'react';
import { Box, Text, Button, Tooltip, Stack, Flex } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

type Revenue = {
  amount: string;
  date: Date | null;
  categories: { key: string; value: string }[];
};

type RevenueListProps = {
  revenueList: Revenue[];
};

const RevenueList: React.FC<RevenueListProps> = ({ revenueList }) => {
  const [visibleItems, setVisibleItems] = useState(4);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleEdit = (index: number) => {
    console.log(`Edit item at index ${index}`);
  };

  const handleDelete = (index: number) => {
    console.log(`Delete item at index ${index}`);
  };

  return (
    <Box p={3} borderWidth="1px" borderRadius="md" overflow="hidden" maxW="sm">
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Revenue List
      </Text>
      {revenueList.slice(0, visibleItems).map((revenue, index) => (
        <Box
          key={index}
          p={2}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bgColor: 'gray.100' }}
          transition="background-color 0.3s"
          mb={2}
        >
          <Text>
            <strong>Amount:</strong> ${revenue.amount}
          </Text>
          <Text>
            <strong>Date:</strong> {revenue.date?.toLocaleDateString()}
          </Text>
          {revenue.categories.map((category, i) => (
            <Box key={i} ml={1}>
              <Text>
                {category.key}: {category.value}
              </Text>
            </Box>
          ))}
          <Flex justify="flex-end" mt={2}>
            <Tooltip label="Edit" hasArrow placement="top">
              <Button
                colorScheme="teal"
                size="xs"
                leftIcon={<FaEdit />}
                onClick={() => handleEdit(index)}
              >
                Edit
              </Button>
            </Tooltip>
            <Tooltip label="Delete" hasArrow placement="top" ml={2}>
              <Button
                colorScheme="red"
                size="xs"
                leftIcon={<FaTrash />}
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </Tooltip>
          </Flex>
        </Box>
      ))}
      {revenueList.length > visibleItems && (
        <Button colorScheme="teal" size="sm" onClick={loadMore} mt={1}>
          Load More
        </Button>
      )}
      <Stack mt={4} spacing={2}>
        <Button colorScheme="teal" size="sm">
          Add Data Manually
        </Button>
        <Button colorScheme="teal" size="sm">
          Pick/Create Template
        </Button>
      </Stack>
    </Box>
  );
};

export default RevenueList;
