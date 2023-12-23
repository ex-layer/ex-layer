// FullCode.tsx
'use client'
import React from 'react';
import { Text } from '@chakra-ui/react';
import { useTable, useSortBy } from 'react-table';
import { BiEdit, BiTrash } from 'react-icons/bi'; // Import icons for edit and delete
import Prompt from './add_prompt';
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
  useColorMode,
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
    // Set responsive font size for mobile
    style: { fontSize: ['xs', 'sm', 'md'] },
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
    // Set responsive font size for mobile
    style: { fontSize: ['xs', 'sm', 'md'] },
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }: { value: Date }) => value?.toLocaleDateString(),
    // Set responsive font size for mobile
    style: { fontSize: ['xs', 'sm', 'md'] },
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: () => (
      <Flex align="center" gap={0.2}>
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
    width: 30,
    // Set responsive font size for mobile
    style: { fontSize: ['xs', 'sm', 'md'] },
  },
];
const RevenueList: React.FC<RevenueListProps> = ({ revenueList }) => {
  const { colorMode } = useColorMode();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: revenueList }, useSortBy);

  return (
    <main>
          <Box>
        <Text p={4} fontSize="3xl" fontWeight="bold">
          Data
        </Text>
      </Box>
    <Box  
      borderColor={colorMode === 'light' ? 'black' : 'white'}
      mx={[2, 3, 4]}
      p={[2, 3, 4]}
     // borderWidth="1px"
      borderRadius="2xl"
      overflowX="hidden"
      maxHeight="400px"
      position="relative"
      boxShadow="md"
    >
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
                    {cell.column.id === 'action' ? (
                      <Flex align="center" justify="space-around">
                        {/* Edit Button */}
                        <Tooltip label="Edit Notes" hasArrow placement="top">
                          <IconButton
                            colorScheme="teal"
                            size="xs"
                            aria-label="Edit"
                            icon={<BiEdit />}
                            // Implement the edit functionality here
                          />
                        </Tooltip>
                        {/* Delete Button */}
                        <Tooltip label="Delete" hasArrow placement="top">
                          <IconButton
                            colorScheme="red"
                            size="xs"
                            aria-label="Delete"
                            icon={<BiTrash />}
                            // Implement the delete functionality here
                          />
                        </Tooltip>
                      </Flex>
                    ) : (
                      // Render other cell data
                      cell.render('Cell')
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      
    </Box>
    <Prompt/>
  </main>
  );
};

export default RevenueList;