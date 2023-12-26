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

export type AddBoxProps = {
  onSave: (newDataArray: Revenue[]) => void;
  transactionList: Revenue[];
  onClose: () => void;
};
export type addRevenue = {
  categories: Array<{
      key: string;
      value: string;
  }>;
  amount: number;
  date: Date | null;
  type: 'revenue' | 'expense';
  payment_id: number;
  quantity: number
}
const Add_Box: React.FC<AddBoxProps> = ({ transactionList, onSave, onClose }) => {
  const { colorMode } = useColorMode();
  const dollarSignColor = colorMode === 'light' ? 'black' : 'gray'

  const hoverBorderColor = colorMode === 'light' ? 'gray.600' : 'gray.400';

  const [formData, setFormData] = useState<addRevenue>({
    type: 'revenue', // Default type is Revenue
    amount: 0,
    date: null,
    categories: [{ key: '', value: '' }],
    quantity:1,
    payment_id: 0
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Extract quantity from formData
    const { quantity, amount, ...formDataWithoutQuantity } = formData;
  
    // Call onSave in a loop, quantity times
    const newDataArray = Array.from({ length: quantity }, (_, index) => ({
      ...formDataWithoutQuantity,
      payment_id: Math.floor(Math.random() * 1000) + 201, // Generate a random number above 200
      quantity: 1, // Set quantity to 1 for each iteration
      amount: typeof amount === 'number' ? amount : 0, // Ensure amount is always a number
    }));
  
    // Combine transactionList with newDataArray
    const combinedData = [...transactionList, ...newDataArray];
  
    onSave(combinedData);
    onClose()
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData: addRevenue) => ({
      ...prevData,
      type: value.toLowerCase() as 'revenue' | 'expense',
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Explicitly cast the value to a number if the input is for 'amount'
    const numericValue =
      name === 'amount' ? (value.trim() === '' ? '' : Number(value)) : value;

    setFormData((prevData: addRevenue) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const handleCategoryChange = (index: number, field: string, value: string) => {
    setFormData((prevData: addRevenue) => {
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
    setFormData((prevData: addRevenue) => ({
      ...prevData,
      date,
    }));
  };

  const handleAddCategory = () => {
    setFormData((prevData: addRevenue) => ({
      ...prevData,
      categories: [...prevData.categories, { key: '', value: '' }],
    }));
  };

  const handleRemoveCategory = (index: number) => {
    setFormData((prevData: addRevenue) => {
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
        Add a transaction
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              _hover={{ borderColor: hoverBorderColor }}
              name="type"
              value={formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} // Capitalize the first letter
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
            <InputLeftAddon  color={dollarSignColor} />
            <FaDollarSign />
              <Input
               _hover={{ borderColor: hoverBorderColor }}
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
              onChange={(date) => handleDateChange(date)}
              placeholderText="Select date"
              customInput={<Input _hover={{ borderColor: hoverBorderColor }}/>}
              dateFormat="MMMM d, yyyy"
              popperPlacement="auto" // Position the datepicker to pop out to the right
            />
          </FormControl>
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <Input
            _hover={{ borderColor: hoverBorderColor }}
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
                _hover={{ borderColor: hoverBorderColor }}
                  type="text"
                  name={`Category-${index}`}
                  className="mb-3"
                  value={category.key}
                  onChange={(e) => handleCategoryChange(index, 'key', e.target.value)}
                  placeholder="Category"
                  size="sm"
                />
                <Input
                _hover={{ borderColor: hoverBorderColor }}
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

export default Add_Box;
