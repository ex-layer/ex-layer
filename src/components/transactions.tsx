'use client'
// FullCode.tsx
import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tooltip,
  Flex,
  IconButton,
  Stack,
  Textarea,
  Text,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const RevenueList: React.FC<RevenueListProps> = ({ revenueList }) => {
  const [visibleItems, setVisibleItems] = useState(4);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  const handleEdit = (index: number) => {
    if (revenueList && revenueList[index]) {
      setEditingIndex(index);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <Box p={[2, 3, 4]} borderWidth="1px" borderRadius="md" overflow="hidden">
      <Table variant="simple" size={['xs', 'sm', 'md']}>
        <Thead>
          <Tr>
            <Th>Categories</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {revenueList?.slice(0, visibleItems).map((revenue, index) => (
            <Tr key={index}>
              <Td>
                {revenue.categories.map((category, i) => (
                  <span key={i} className="category-cell">
                    {i > 0 && ', '}
                    {category.key}: {category.value}
                  </span>
                ))}
              </Td>
              <Td>${revenue.amount}</Td>
              <Td>{revenue.date?.toLocaleDateString()}</Td>
              <Td>
                <Flex align="center" gap={1}>
                  <Tooltip label="Edit Notes" hasArrow placement="top">
                    <IconButton
                      colorScheme="teal"
                      size="xs"
                      aria-label="Edit"
                      icon={<FaEdit />}
                      onClick={() => handleEdit(index)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete" hasArrow placement="top">
                    <IconButton
                      colorScheme="red"
                      size="xs"
                      aria-label="Delete"
                      icon={<FaTrash />}
                      // Implement the delete functionality here
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {revenueList?.length > visibleItems && (
        <Button colorScheme="teal" size="sm" onClick={loadMore} mt={2}>
          Load More
        </Button>
      )}
      <Stack mt={2} spacing={1} direction="row">
        <Button colorScheme="teal" size="sm">
          + Add Data
        </Button>
        <Button colorScheme="teal" size="sm">
          Template
        </Button>
      </Stack>
    </Box>
  );
};

export default RevenueList;
