import React, { ChangeEvent, useState, useEffect } from 'react';
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
  useColorMode,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaPlus, FaMinus, FaDollarSign } from 'react-icons/fa';
import { Revenue } from './transactions';

export type EditBoxProps = {
  transaction: Revenue;
  revenueList: Revenue[];
  onSave: (editedList: Revenue[]) => void;
  onClose: () => void;
};


const Edit_Box: React.FC<EditBoxProps> = ({ transaction, revenueList, onSave , onClose}) => {
  const { colorMode } = useColorMode();
  const dollarSignColor = colorMode === 'light' ? 'black' : 'gray'
  
  const [formData, setFormData] = useState<Revenue>(transaction || {
    type: 'revenue',
    amount: 0,
    date: null,
    categories: [{ key: '', value: '' }],
    payment_id: 0
  });

  const handleSave = (e: React.FormEvent) => {
    // Perform any validation or processing before saving if needed
    // ...
    e.preventDefault();
    // Find the index of the edited transaction in revenueList
    const index = revenueList.findIndex((item) => item.payment_id === formData.payment_id);
    console.log('Type of revenueList:', typeof revenueList);
    console.log('Content of revenueList:', revenueList);
    // If the transaction is found in revenueList, update it
    if (index !== -1) {
      const updatedRevenueList = [...revenueList];
      updatedRevenueList[index] = formData;

      // Call the onSave function with the updated revenueList
      
      onSave(updatedRevenueList);
      
      // Close the modal after saving
      onClose();
    } else {
      // Handle the case where the transaction is not found in revenueList
      console.error('Transaction not found in revenueList');
    }
  };
  console.log(transaction)
  useEffect(() => {
    // Update formData when transaction changes
    setFormData(transaction || {
      type: 'revenue',
      amount: 0,
      date: null,
      categories: [{ key: '', value: '' }],
    });
  }, [transaction]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const newType: 'revenue' | 'expense' = value === 'Revenue' ? 'revenue' : 'expense';
    setFormData((prevData: Revenue) => ({
      ...prevData,
      type: newType,
    }));
  };
  

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Explicitly cast the value to a number if the input is for 'amount'
    const numericValue = name === 'amount' ? (value.trim() === '' ? '' : Number(value)) : value;
  
    setFormData((prevData: Revenue) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };
  const handleCategoryChange = (index: number, field: string, value: string) => {
    setFormData((prevData: Revenue) => {
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

  const handleDateChange = (date: Date ) => {
    setFormData((prevData: Revenue) => ({
      ...prevData,
      date: date || null,
    }));
  };

  const handleAddCategory = () => {
    setFormData((prevData: Revenue) => ({
      ...prevData,
      categories: [...prevData.categories, { key: '', value: '' }],
    }));
  };

  const handleRemoveCategory = (index: number) => {
    setFormData((prevData: Revenue) => {
      const updatedCategories = [...prevData.categories];
      updatedCategories.splice(index, 1);
      return {
        ...prevData,
        categories: updatedCategories,
      };
    });
  };


  return (
    <Box maxW="xl" m="auto" p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading as="h2" size="lg" mb={4}>
        Edit transaction
      </Heading>
      <form onSubmit={handleSave}>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
            name="type"
            value={formData.type === 'revenue' ? 'Revenue' : 'Expense'}
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
              <InputLeftAddon  color={dollarSignColor}  children={<FaDollarSign/>} />
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
              popperPlacement="auto"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Categories</FormLabel>

            {formData.categories.map((category: any, index: number) => (
              <Stack key={index} direction="row" spacing={4}>
                <Input
                  type="text"
                  name={`Category-${index}`}
                  className="mb-3"
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
                  size="sm"
                />
              </Stack>
            ))}

            <Button
              variant="link"
              colorScheme="teal"
              size="sm"
              leftIcon={<FaPlus />}
              onClick={handleAddCategory}
              mt={4}
            >
              Add Category
            </Button>
          </FormControl>
          <Button colorScheme="green" type="submit">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Edit_Box;
