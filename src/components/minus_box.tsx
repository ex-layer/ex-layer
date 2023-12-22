// Make sure to install @chakra-ui/react and react-icons
// npm install @chakra-ui/react react-icons
'use client'
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  IconButton,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaPlus, FaMinus, FaDollarSign } from 'react-icons/fa';

const ExpenseInputForm = () => {
  const [formData, setFormData] = useState<any>({
    amount: '',
    date: null,
    categories: [
      { key: '', value: '' },
    ],
    quantity: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

// ... (previous code)

const handleCategoryChange = (index: number, field: string, value: string) => {
  setFormData((prevData: any) => {
    const updatedCategories = [...prevData.categories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [field]: value,
    };
    return {
      ...prevData,
      categories: updatedCategories,
    };
  });
};

// ... (remaining code)


  const handleDateChange = (date: Date | null) => {
    setFormData((prevData: any) => ({
      ...prevData,
      date,
    }));
  };

  const handleAddCategory = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      categories: [...prevData.categories, { key: '', value: '' }],
    }));
  };

  const handleRemoveCategory = (index: number) => {
    setFormData((prevData: any) => {
      const updatedCategories = [...prevData.categories];
      updatedCategories.splice(index, 1);
      return {
        ...prevData,
        categories: updatedCategories,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the submission of the form data
    console.log(formData);
  };

  return (
    <Box maxW="xl" m="auto" p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading as="h2" size="lg" mb={4}>
        Expense Input 
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaDollarSign />} />
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              placeholderText="Select date"
              customInput={<Input />}
              dateFormat="MMMM d, yyyy"
              popperPlacement="right-start" // Position the datepicker to pop out to the right
            />
          </FormControl>
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Categories</FormLabel>
            
            {formData.categories.map((category: any, index: number) => (
              <Stack key={index} direction="row" spacing={4}>
                <Input
                  type="text"
                  name={`Category-${index}`}
                  className = "mb-3"
                  value={category.key}
                  onChange={(e) => handleCategoryChange(index, 'key', e.target.value)}
                  placeholder="Category"
                  size="sm"
                  
                />
                <Input
                  type="text"
                  name={`value-${index}`}
                  value={category.value}
                  onChange={(e) => handleCategoryChange(index, 'value', e.target.value)}
                  placeholder="Value"
                  size="sm"
                />
                <IconButton
                  aria-label={`Remove Category ${index}`}
                  icon={<FaMinus />}
                  onClick={() => handleRemoveCategory(index)}
                  size ="sm"
              />
              </Stack>
            ))}

            <Button
              variant="link"
              colorScheme="teal"
              size="sm"
              leftIcon={<FaPlus />}
              onClick={handleAddCategory}
              mt={4} // Add space between the category box and the "add category" button
            >
              Add Category
            </Button>
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ExpenseInputForm;
