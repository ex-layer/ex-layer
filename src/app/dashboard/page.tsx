import Image from 'next/image'
import { ChakraProvider, ListProps } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import {LinkSheet, url} from "@/components/link" 
import CreateSheet from "@/components/setup"
import { useContext } from 'react'
import Info from "@/components/infocard"


export default function Dashboard() {

  
  

  return (
    <ChakraProvider>
    <main className="flex min-h-screen flex-col items-center">
    <Info />
    </main>
    </ChakraProvider>

  )
}