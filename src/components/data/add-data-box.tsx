import React, { ChangeEvent, useState } from 'react';
import {
  Select,
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

export type FormData = {
  type: 'Revenue' | 'Expense';
  amount: number | '';
  date: Date | null;
  categories: { key: string; value: string }[];
  quantity: number;
};


const RevenueInputForm = () => {
  
  const [formData, setFormData] = useState<FormData>({
    type: 'Revenue', // Default type is Revenue
    amount: '',
    date: null,
    categories: [{ key: '', value: '' }],
    quantity: 1,
  });
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      type: value as 'Revenue' | 'Expense',
    }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));
  };


const handleCategoryChange = (index: number, field: string, value: string) => {
  setFormData((prevData: FormData) => {
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


  const handleDateChange = (date: Date | null) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      date,
    }));
  };

  const handleAddCategory = () => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      categories: [...prevData.categories, { key: '', value: '' }],
    }));
  };

  const handleRemoveCategory = (index: number) => {
    setFormData((prevData: FormData) => {
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
      Add a transaction
    </Heading>
    <form onSubmit={handleSubmit}>
      <Stack spacing={6}>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={(e) => handleTypeChange(e)}
            placeholder="Select Type"
          >
            <option value="Revenue">Revenue</option>
            <option value="Expense">Expense</option>
          </Select>
        </FormControl>
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
              popperPlacement="auto" // Position the datepicker to pop out to the right
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
          <Button colorScheme="green" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RevenueInputForm;
