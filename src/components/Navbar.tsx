// components/Navbar.tsx
'use client'
import { Box, Flex, Button, useColorMode, Icon, Switch } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiSun, FiMoon } from "react-icons/fi"; // Import icons for day and night

const Navbar: React.FC = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const arrow: string = '->';

  const goToExLayerDemo = () => {
    router.push("https://full-ex-layer-url");
  };

  return (
    <Box bg="green.400" p={3}>
      <Flex align="center" justify="space-between">
        <Button
          as="span"
          variant="link"
          color="white"
          fontWeight="bold"
          fontSize="lg"
          _hover={{ opacity: 0.8 }}
          onClick={goToExLayerDemo}
        >
          ex-layer demo
        </Button>
        <div style={{ color: "white" }}>
          Go to the full{' '}
          <Button
            as="span"
            variant="link"
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={goToExLayerDemo}
          >
            ex-layer {arrow}
          </Button>
        </div>
        {/* Use custom Switch component for more customization */}
     
        <CustomSwitch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      </Flex>
    </Box>
  );
};

// Custom Switch component with icon inside
// Custom Switch component with icon inside
const CustomSwitch: React.FC<{ isChecked: boolean; onChange: () => void }> = ({
  isChecked,
  onChange,
}) => {
  return (
    <Flex align="center">
      <Icon as={FiSun} color="yellow.400" mr={2} />
      <Switch
        isChecked={isChecked}
        onChange={onChange}
        sx={{
          "& .chakra-switch__track": {
            bg: isChecked ? "teal.500" : "gray.300",
            transition: "background 0.5s ease-in-out", // Add the transition property here
          },
          "& .chakra-switch__label": {
            color: isChecked ? "white" : "gray.700",
          },
          "& .chakra-switch__thumb": {
            bg: isChecked ? "teal.500" : "white",
            boxShadow: isChecked ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
            transition: "background 0.5s ease-in-out", // Add the transition property here
          },
        }}
      />
      <Icon as={FiMoon} color="gray.700" ml={2} />
    </Flex>
  );
};

 
export default Navbar;
