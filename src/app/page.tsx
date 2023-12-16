import Image from 'next/image'
import { ChakraProvider } from '@chakra-ui/react'
import {LinkSheet} from "@/components/link" 
import CreateSheet from "@/components/setup"
export default function Home() {

  return (
    <ChakraProvider>
    <main className="flex min-h-screen flex-col items-center">
    <h1 className ="text-center text-2xl mt-40 ">Ex-layer: Customizable visualizations and interfaces to interact with data</h1>
      <div className = "w-60">

      <div className = "flex flex-col mt-20">
      <CreateSheet/>
      <h1 className = "text-center m-3">OR</h1>
      <LinkSheet />
      </div>
      </div>
    </main>
    </ChakraProvider>

  )
}