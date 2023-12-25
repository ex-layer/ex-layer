import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  ChakraProvider,
  extendTheme,
  CSSReset,
} from '@chakra-ui/react';
import Add_Box from '@/components/data/add-data';
import AddFromTemplate from './add-from-template';
import ModalWrapper from '../misc/modal_wrapper';
import { Revenue } from './transactions';

const Prompt: React.FC = () => {
  const [activeModal, setActiveModal] = useState<null | 'manual' | 'template'>(
    null
  );
  const [newList, setNewList] = useState<Revenue[]>([]);

  const mockRevenues: Revenue[] = [
    {
      amount: 1000,
      date: new Date('2023-01-01'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category2', value: 'Value2' },
      ],
      type: 'revenue', // This one is revenue
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
      payment_id:7
    },
  ]

  const handleModalOpen = (type: 'manual' | 'template') => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box m="5" textAlign="center">
        <Stack mt={2} spacing={4} direction="row">
          <Button
            fontSize={['xs', 'sm', 'md']}
            colorScheme="green"
            size="md"
            onClick={() => handleModalOpen('manual')}
          >
            + Add Data Manually
          </Button>
          <Button
            fontSize={['xs', 'sm', 'md']}
            colorScheme="green"
            size="md"
            onClick={() => handleModalOpen('template')}
          >
            + Add Data From Template
          </Button>
        </Stack>
      </Box>

      <ModalWrapper
        isOpen={activeModal === 'manual'}
        onClose={handleCloseModal}
        title="Add Data Manually"
      >
        <Add_Box />
      </ModalWrapper>

      <ModalWrapper
        isOpen={activeModal === 'template'}
        onClose={handleCloseModal}
        title="Add Data From Template"
      >
        <AddFromTemplate
          revenueList={mockRevenues}
          newList={newList}
          setNewList={setNewList}
        />
      </ModalWrapper>
    </ChakraProvider>
  );
};

export default Prompt;


