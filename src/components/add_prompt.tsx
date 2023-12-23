import React, { useState } from 'react';
import { Box, Stack, Button, ChakraProvider, extendTheme, CSSReset, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Add_Box from '@/components/add_box'; // Replace with the actual path to your Add_Button component

const Prompt: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDataClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box m="5" textAlign="center">
        <Stack mt={2} spacing={4} direction="row">
          <Button colorScheme="green" size="md" onClick={handleAddDataClick}>
            + Add Data Manually
          </Button>
          <Button colorScheme="green" size="md">
            + Add Data From Template
          </Button>
        </Stack>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Data Manually</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render your Add_Button component here */}
            <Add_Box />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default Prompt;
