import React, { useState } from 'react';
import { Box, Stack, Button, ChakraProvider, extendTheme, CSSReset, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Add_Box from '@/components/data/add-data'; // Replace with the actual path to your Add_Button component
import AddFromTemplate from './add-from-template';
import { Revenue, RevenueListProps } from './transactions';

const Prompt: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [newList, setNewList] = useState<Revenue[]>([]);

  // testing purposes, pull real saved revenues from the backend
  const mockRevenues: Revenue[] = [
    {
      amount: 1000,
      date: new Date('2023-01-01'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category2', value: 'Value2' },
      ],
      type: 'revenue', // This one is revenue
    },
    {
      amount: 1500,
      date: new Date('2023-02-15'),
      categories: [
        { key: 'Category1', value: 'Value1' },
        { key: 'Category3', value: 'Value3' },
      ],
      type: 'revenue', // This one is revenue
    },
  ]
  const handleAddDataClick = () => {
    setIsModalOpen(true);
  };
  const handleAddTemplateDataClick = () => {
    setIsTemplateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTemplateCloseModal = () => {
    setIsTemplateModalOpen(false);
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box m="5" textAlign="center">
        <Stack mt={2} spacing={4} direction="row">
          <Button fontSize={['xs', 'sm', 'md']} colorScheme="green" size="md" onClick={handleAddDataClick}>
            + Add Data Manually
          </Button>
          <Button  fontSize={['xs', 'sm', 'md']} colorScheme="green" size="md" onClick={handleAddTemplateDataClick}>
            + Add Data From Template
          </Button>
        </Stack>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Add Data Manually</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Add_Box />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isTemplateModalOpen} onClose={handleTemplateCloseModal} size="2xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Add Data From a Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddFromTemplate revenueList={mockRevenues} newList ={newList} setNewList={setNewList} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default Prompt;
