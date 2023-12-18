"use client"
import { ChakraProvider, Button, Collapse, SlideFade, Text, useBoolean, Center, Box, Input} from '@chakra-ui/react'
import { FunctionComponent} from 'react'

const CreateSheet: FunctionComponent = () => {
    const [button, boolean] = useBoolean()
    const [enter, boolean2] = useBoolean()
 
    return (
  <ChakraProvider>
     <div className = "w-12/12 grid justify-items-center">
    <Button onClick={boolean.toggle} className = "mt-4 w-2/12" borderRadius='32px' fontSize='16px' colorScheme='whatsapp' >Create & link data layer</Button>
    </div>
    <Collapse in={button} animateOpacity>
    <Text fontSize='4xl'className = "m-4" align="center" >Create a Spreadsheet</Text>
    <div className = "grid justify-items-center w=100% h=100%">
      <Box borderWidth='8px' borderRadius='32px' w='90%' className = "mb-8" h='95%' p={6} color='black' text-aign={Center}>
          <div className = "flex justify-start">
              
                <Box borderWidth='8px' className = "m-5 h-96 w-4/12" borderRadius='32px' color='black'>
                  <SlideFade in={button} offsetX='20px'transition={{enter: {delay: .5, duration: 0.5}}}> 
                    <div className="flex flex-row">
                      <div>
                      <Box borderWidth='8px'borderColor={"white"} className = "m-1 h-16 w-16" borderRadius='320px' bgColor='#22c35e' text-aign={Center}>
                        <Text fontSize='4xl'color="white" className = "ml-1" align="center" >1.</Text>
                      </Box> 
                      </div>
                      <div className="flex flex-reverse"><Text fontSize='4xl' w='100%' align="center" p={6} >Navigate to google.com/sheets</Text></div>
                    </div>
                  </SlideFade>                 
                </Box> 
  
              <Box borderWidth='8px' className = "m-5 h-96 w-4/12" borderRadius='32px' color='black' text-aign={Center}>
                <SlideFade in={button} offsetX='20px' transition={{enter: {delay: 1, duration: 0.5}}} > 
                    <div className="flex flex-row">
                      <div>
                      <Box borderWidth='8px'borderColor={"white"} className = "m-1 h-16 w-16" borderRadius='320px' bgColor='#22c35e' text-aign={Center}>
                        <Text fontSize='4xl'color="white" className = "ml-1" align="center" >2.</Text>
                      </Box> 
                      </div>
                      <div className="flex flex-reverse"><Text fontSize='4xl' className = "ml-16" w='100%'  p={6}align="center" >Share the spreadsheet</Text></div>
                    </div>
                  </SlideFade>             
              </Box>

              <Box borderWidth='8px' className = "m-5 h-96 w-4/12" borderRadius='32px' color='black' text-aign={Center}>
                <SlideFade in={button} offsetX='20px'transition={{enter: {delay: 1.5, duration: 0.5}}}> 
                    <div className="flex flex-row">
                      <div>
                      <Box borderWidth='8px'borderColor={"white"} className = "m-1 h-16 w-16" borderRadius='320px' bgColor='#22c35e' text-aign={Center}>
                        <Text fontSize='4xl'color="white" className = "ml-1" align="center" >3.</Text>
                      </Box> 
                      </div>
                      <div className="flex flex-reverse"><Text fontSize='4xl' w='100%' align="center" p={6}>Enable sharing and editing for all</Text></div>
                    </div>
                  </SlideFade>             
              </Box>
          </div>
      </Box>
    </div>
    <SlideFade in={button} offsetY='20px'transition={{enter: {delay: 2, duration: 0.5}}}> 
      <div className = "grid justify-items-center w=100% h=100%">
        <Box borderWidth='8px' borderRadius='32px' w='30%' className = "mb-8" h='75%' p={6} color='black' text-aign={Center}>
          <Input variant='unstyled' placeholder='Paste Spreadsheet URL:'></Input>
        </Box>
      </div>
    </SlideFade>     
    <SlideFade in={button} offsetY='-20px' transition={{enter: {delay: 2.5, duration: 0.5}}}> 
      <div className = "grid justify-items-center w=100% h=100%">
        <Button onClick={boolean2.toggle} className = "w-2/12" borderRadius='32px' fontSize='16px' colorScheme='whatsapp' >Enter</Button>
      </div>
    </SlideFade>  
    </Collapse>
  </ChakraProvider>
    );


}

export default CreateSheet;