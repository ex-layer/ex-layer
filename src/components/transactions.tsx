// FullCode.tsx
'use client'
import React from 'react';
import { useTable, useSortBy } from 'react-table';
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
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Define the Revenue type
export type Revenue = {
  categories: Array<{ key: string; value: string }>;
  amount: number;
  date: Date;
  type: 'revenue' | 'expense'; // New field indicating revenue or expense
  // add other properties as needed
};

// Define the RevenueListProps type
export type RevenueListProps = {
  revenueList: Revenue[];
};

const columns = [
  {
    Header: 'Categories',
    accessor: 'categories',
    Cell: ({ value }: { value: any[] }) =>
      value.map((category, i) => (
        <span key={i} className="category-cell">
          {i > 0 && ', '}
          {category.key}: {category.value}
        </span>
      )),
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    Cell: ({ value }: { value: number }) => (
      <span style={{ color: value < 0 ? 'red' : 'green' }}>
        {value < 0 ? '- $' : '+ $'}
        {Math.abs(value)}
      </span>
    ),
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }: { value: Date }) => value?.toLocaleDateString(),
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: () => (
      <Flex align="center" gap={1}>
        <Tooltip label="Edit Notes" hasArrow placement="top">
          <IconButton
            colorScheme="teal"
            size="xs"
            aria-label="Edit"
            // Implement the edit functionality here
          />
        </Tooltip>
        <Tooltip label="Delete" hasArrow placement="top">
          <IconButton
            colorScheme="red"
            size="xs"
            aria-label="Delete"
            // Implement the delete functionality here
          />
        </Tooltip>
      </Flex>
    ),
    disableSortBy: true,
    width: 60,
  },
];

const RevenueList: React.FC<RevenueListProps> = ({ revenueList }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: revenueList }, useSortBy);

  return (
    <Box p={[2, 3, 4]} borderWidth="1px" borderRadius="md" overflowY="auto" maxHeight="200px">
      <Table variant="simple" size={['xs', 'sm', 'md']} {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={column.id === 'action' ? column.width : undefined}
                  key={column.id}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Stack mt={2} spacing={1} direction="row">
        <Button colorScheme="teal" size="sm">
          + Add Data
        </Button>
        <Button colorScheme="teal" size="sm">
          Add Data From Template
        </Button>
      </Stack>
    </Box>
  );
};

export default RevenueList;
