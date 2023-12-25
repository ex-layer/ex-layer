import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';

import { Box, Link, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Prompt from './prompt';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export type Revenue = {
  categories: Array<{ key: string; value: string }>;
  amount: number;
  date: Date;
  type: 'revenue' | 'expense';
};

export type RevenueListProps = {
  revenueList: Revenue[];
  onEdit: (editedList: Revenue[]) => void;
};

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const CustomCategoriesCellEditor = forwardRef((props: any, ref: any) => {
  const { api, node } = props;
  const initialValue = Array.isArray(props.value)
    ? props.value.map((category: { key: string; value: string }) => `${category.key}: ${category.value}`).join('\n')
    : props.value;
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleBlur = () => {
    const newValue = editedValue.split('\n').map((line: string) => {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      return {
        key: key.trim(),
        value: value,
      };
    });

    api.stopEditing();
    node.setDataValue('categories', newValue);
  };

  const getValue = () => {
    console.log(editedValue)
    return editedValue; // Return the string value, not JSON.stringify(editedValue)
  };

  useImperativeHandle(ref, () => ({
    getValue,
  }));

  return (
    <textarea
      ref={ref}
      value={editedValue}
      style={{ width: '100%', height: '100%' }}
      onBlur={handleBlur}
      onChange={(e) => setEditedValue(e.target.value)}
    />
  );
});

const columns = [
  {
    headerName: 'Categories',
    field: 'categories',
    editable: true,
    cellEditor: 'customCategoriesCellEditor',
    cellRenderer: (params: any) => {
      if (Array.isArray(params.value)) {
        return params.value
          .map((category: { key: string; value: string }) => `${category.key}: ${category.value}`)
          .join('\n');
      }
      return '';
    },
    width: 250,
  },
  {
    headerName: 'Amount',
    field: 'amount',
    editable: true,
    cellRenderer: (params: any) => (
      <Text fontSize={['xs', 'sm', 'md']} color={params.value < 0 ? 'red' : 'green'}>
        {params.value < 0 ? '- $' : '+ $'}
        {Math.abs(params.value)}
      </Text>
    ),
  },
  {
    headerName: 'Date',
    field: 'date',
    editable: true,
    cellRenderer: (params: any) => (
      <Text fontSize={['xs', 'sm', 'md']}>{formatDate(params.value)}</Text>
    ),
  },
];

const RevenueList: React.FC<RevenueListProps> = ({ revenueList, onEdit }) => {
  const { colorMode } = useColorMode();
  const cardBackgroundColor = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.600');

  const gridOptions = {
    columnDefs: columns,
    rowData: revenueList,
    onCellValueChanged: (event: any) => {
      const { rowIndex, colDef, newValue } = event;
      const updatedList = [...revenueList];
      
      if (colDef.field === 'categories') {
        // Unpack the data from a JSON string
        const keyValuePairs = newValue.split(' ');

        // Convert the array of key-value pairs into an array of objects
        const jsonArray = keyValuePairs.map(pair => {
          const [key, value] = pair.split(':');
          return { [key]: value };
        });

        // Convert the array of objects into a JSON string
        const jsonString = JSON.stringify(jsonArray);
        console.log(JSON.parse(jsonString))
        updatedList[rowIndex][colDef.field] = JSON.parse(jsonString);
      } else {
        const parsedValue = parseFloat(newValue);
      
        if (!isNaN(parsedValue)) {
          updatedList[rowIndex][colDef.field] = parsedValue;
        }
      }
      

      onEdit(updatedList);
    },
    components: {
      customCategoriesCellEditor: CustomCategoriesCellEditor,
    },
    domLayout: 'autoHeight',
    onCellClicked: (event: any) => {
      if (event.column.colDef.editable) {
        event.api.startEditingCell({
          rowIndex: event.rowIndex,
          colKey: event.column.colId,
        });
      }
    },
  };

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
          <Text p={4} fontSize="3xl" fontWeight="bold">
            Data
          </Text>
          <Link
            href="#your-link-url" // Replace with the actual link URL
            _hover={{
              textDecoration: 'none',
              color: 'teal.500',
              transition: 'color 0.3s ease',
            }}
            display="inline-block"
          >
            <Text fontSize="sm" borderBottom="2px" display="inline">
              manage your data
            </Text>
          </Link>
          <Box as={FaLongArrowAltRight} display="inline" ml={2} />
        </Box>

        <Box
          borderColor={colorMode === 'light' ? 'black' : 'white'}
          mx={[2, 3, 4]}
          p={[2, 3, 4]}
          borderRadius="2xl"
          overflowX="hidden"
          position="relative"
          boxShadow="md"
          maxWidth="100%"
          marginX="auto"
        >
          <div
            className="ag-theme-alpine"
            style={{
              height: '400px',
              width: '100%',
            }}
          >
            <AgGridReact {...gridOptions} />
          </div>
        </Box>
        <Prompt />
      </Box>
    </main>
  );
};

export default RevenueList;
