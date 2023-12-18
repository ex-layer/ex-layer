'use client'
<<<<<<< HEAD
import { ChakraProvider, useBoolean, Input, Button, Fade, InputGroup, InputRightElement, ScaleFade } from '@chakra-ui/react'
=======
import { ChakraProvider, useBoolean, Input, Button, Collapse, Fade, InputGroup, InputRightElement } from '@chakra-ui/react'
>>>>>>> 1a7e9d64490ccf2f9f70a49ad8602020e2d1042d
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { createContext } from 'react'
import {FunctionComponent } from 'react'

// Typescript Code
var url : string = "";

const LinkSheet: FunctionComponent = () => {

  // Typescript Code --> 



  // Checking if what you put in is a URL

  const router = useRouter();
  const arrow : String = "->"

  const isValidUrl = (urlString: string): boolean => {
    // If URL is valid
    try { 
      return Boolean(new URL(urlString)); 
    } catch (e) { 
      return false; 
    }
  };
  
 const [pressed, bool] = useBoolean()

 const [value, setValue] = React.useState('')
 const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => setValue(event.target.value)

 const handleClick = () => {

  // TO DO: Change if condition to fetch URL and check that it is an google spreadsheet, along with the URL check
  if (isValidUrl(value)) { 
    url = value
    router.push("/dashboard")
  } else {
    alert("Invalid URL. Please try again.")
  }
  }
 



 // Returned React Code

 return (
  <ChakraProvider>
      <Button colorScheme='messenger' onClick={bool.toggle}>Link existing data layer</Button>
      <Collapse in={pressed} animateOpacity>


      <InputGroup size ='md' className = "mt-4">

  
      <Input value = {value} pr ='5.5rem' onChange={handleChange} placeholder="spreadsheet URL "/>
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {arrow}
        </Button>
      </InputRightElement>

      </InputGroup>
      </Collapse>

  </ChakraProvider>
    );


}


export { LinkSheet, url };