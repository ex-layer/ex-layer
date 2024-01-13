'use client'
import Image from 'next/image'
import { ChakraProvider, ListProps, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import {LinkSheet, url} from "@/components/link" 
import CreateSheet from "@/components/setup"
import { FunctionComponent } from 'react'

const Info : FunctionComponent = () => {
    console.log(url)

    return(
        <Box>
            
        </Box>


    );


}

export default Info