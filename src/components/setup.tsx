import { ChakraProvider, Button } from '@chakra-ui/react'
import { FunctionComponent} from 'react'

const CreateSheet: FunctionComponent = () => {


 return (
  <ChakraProvider>
      <Button colorScheme='messenger' >Create & link data layer</Button>
  </ChakraProvider>
    );


}

export default CreateSheet;