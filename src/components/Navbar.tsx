// components/Navbar.tsx
'use client'
import { Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const arrow : string = "->"
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
          Go to the full{" "}
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
      </Flex>
    </Box>
  );
};

export default Navbar;
