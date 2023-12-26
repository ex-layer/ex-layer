// FullCode.tsx
'use client'
import React from 'react';
import { useState, useEffect} from 'react';
import { Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue } from '@chakra-ui/react';
import { useTable, useSortBy } from 'react-table';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BiEdit, BiTrash } from 'react-icons/bi'; // Import icons for edit and delete
import Edit_Box from './edit-data';
import Prompt from './prompt';
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
  payment_id: number;
  // add other properties as needed
};

// Define the RevenueListProps type
export type RevenueListProps = {
  revenueList: Revenue[];
  onEdit: (editedList: Revenue[]) => void;
  onDelete: (deletedId: number) => void;
};


const columns = [
  {
    Header: 'Categories',
    accessor: 'categories',
    Cell: ({ value }: { value: any[] }) =>
      value.map((category, i) => (
        <Text fontSize={['xs', 'sm', 'md']} key={i} className="category-cell">
          {i > 0}
          {category.key}: {category.value}
        </Text>
      )),

  },
  {
    Header: 'Amount',
    accessor: 'amount',
    Cell: ({ value, row }: { value: number; row: { original: Revenue } }) => (
      <Text fontSize={['xs', 'sm', 'md']} style={{ color: row.original.type === 'revenue' ? 'green' : 'red' }}>
        {row.original.type === 'revenue' ? '+ $' : '- $'}
        {Math.abs(value)}
      </Text>
    ),
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ value }: { value: Date }) => 
    <Text fontSize={['xs', 'sm', 'md']}>
    {value?.toLocaleDateString()}
  
    </Text>
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
const RevenueList: React.FC<RevenueListProps> = ({ revenueList, onEdit, onDelete }) => {
  const { colorMode } = useColorMode();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Revenue | null>(null);

  const handleEditClick = (rowData: Revenue) => {
    setSelectedRowData(rowData);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (rowData: Revenue) => {
    setSelectedRowData(rowData);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRowData(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRowData(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedRowData) {
      onDelete(selectedRowData.payment_id);
      setIsDeleteModalOpen(false);
      setSelectedRowData(null);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: revenueList }, useSortBy);
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
         

        <Box>
        <Flex align="center">
          <Text p={4} fontSize="3xl" fontWeight="bold">
            Data
          </Text>
          <Box ml={1}>
            <Link
              href="#your-link-url" // Replace with the actual link URL
              _hover={{ textDecoration: 'none', color: 'teal.500', transition: 'color 0.3s ease' }} // Remove underline on hover
              display="inline-block"
            >
              <Text fontSize="sm" borderBottom="2px" display="inline" >
                manage your data
              </Text>
            </Link>
            <Box as={FaLongArrowAltRight} display="inline" ml={2} />
          </Box>
        </Flex>
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
      maxWidth="100%"  // Set maximum width to 100% of the container
      marginX="auto"   // Center the box horizontally
    >

      <Table variant="simple" size={['xs', 'sm', 'md']} {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Th
                p={0.5}
                fontSize={['xs', 'sm', 'md']} 
                borderBottomWidth="0.5px"
                borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
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
              <Tr border="0px"  borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}{ ...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <Td border="0px"  borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'} {...cell.getCellProps()} key={cell.column.id}>
                    {cell.column.id === 'action' ? (
                      <Flex align="center" justify="space-around">
                        {/* Edit Button */}
                        <Tooltip label=""hasArrow placement="top">
                        <IconButton
                              colorScheme="teal"
                              size="xs"
                              aria-label="Edit"
                              icon={<BiEdit />}
                              onClick={() => handleEditClick(row.original)}
                            />
                        </Tooltip>
                        {/* Delete Button */}
                        <Tooltip label="" hasArrow placement="top">
                          <IconButton
                            colorScheme="red"
                            size="xs"
                            aria-label="Delete"
                            icon={<BiTrash />}
                            onClick={() => handleDeleteClick(row.original)}
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
    <Prompt revenueList={revenueList} onEdit = {onEdit} onDelete={onDelete}/>
    <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRowData && <Edit_Box transaction={selectedRowData} revenueList = {revenueList} onSave={onEdit} onClose={handleCloseEditModal}/>}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} size="sm">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="red.500">Delete Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" mb={4}>
                Are you sure you want to delete the following record?
              </Text>
              {selectedRowData && (

                <Box>
                   <Text><strong>Transaction Type: </strong> {selectedRowData.type}</Text>
                    <Text mt={2}>
                    <strong>Categories:</strong>
                  </Text>
                  <Box ml={4}>
                    {selectedRowData.categories.map((category, index) => (
                      <Box key={index} mt={1}>
                        <Text>
                          <strong>{category.key}</strong> {category.value}              
                        </Text>

                      </Box>
                    ))}
                  </Box>
                  <br></br>
                  <Text>
                    <strong>Amount:</strong> ${selectedRowData.amount}
                  </Text>
                  <Text>
                    <strong>Date:</strong> {selectedRowData.date?.toLocaleDateString()}
                  </Text>
                  {/* Include other fields as needed */}
                </Box>
              )}
              <Button colorScheme="red" onClick={handleDeleteConfirm} mt={4}>
                Confirm Delete
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>

    </Box>
  </main>
  );
};

export default RevenueList;