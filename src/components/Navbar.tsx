// components/Navbar.tsx
import Image from "next/image";
import { Box, Flex, Button, useColorMode, Icon, Switch } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const arrow: string = '->';

  const goToExLayerDemo = () => {
    router.push("https://full-ex-layer-url");
  };

  return (
    <Box bg="green.400" p={{ base: 2, md: 3 }} overflowX="auto" maxWidth="100%">
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <Button
            as="span"
            variant="link"
            color="white"
            fontWeight="bold"
            fontSize={{ base: "sm", md: "lg" }}
            _hover={{ opacity: 0.8 }}
            onClick={goToExLayerDemo}
            ml={2}
          >
            ex-layer demo
          </Button>
        </Flex>
        <Box style={{ color: "white", textAlign: "center" }}>
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
        </Box>
        <CustomSwitch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      </Flex>
    </Box>
  );
};

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
            transition: "background 0.5s ease-in-out",
          },
          "& .chakra-switch__label": {
            color: isChecked ? "white" : "gray.700",
          },
          "& .chakra-switch__thumb": {
            bg: isChecked ? "teal.500" : "white",
            boxShadow: isChecked ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
            transition: "background 0.5s ease-in-out",
          },
        }}
      />
      <Icon as={FiMoon} color="gray.700" ml={2} />
    </Flex>
  );
};

export default Navbar;
