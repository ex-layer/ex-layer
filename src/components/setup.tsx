"use client"
import { ChakraProvider, Button, Collapse, useBoolean, Box } from '@chakra-ui/react'
import { FunctionComponent} from 'react'

const CreateSheet: FunctionComponent = () => {
    const [button, boolean] = useBoolean()
 
    return (
  <ChakraProvider>
    <Button onClick={boolean.toggle} colorScheme='messenger' >Create & link data layer</Button>

    <Collapse className = "mt-2" in={button} animateOpacity transition={{exit: {delay: 1}, enter: {duration:.2}}} >

    <Box borderWidth='4px' borderRadius='4g' w='100%' p={4} color='black'>
        This is the Box
    </Box>
    
    </Collapse>
  </ChakraProvider>
    );


}

export default CreateSheet;