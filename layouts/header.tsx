import * as React from "react"
import { chakra, Flex } from "@chakra-ui/react"

import SearchBar from "components/search-bar"

const HeaderContent = () => (
  <Flex h='10rem' align='center' justifyContent='center' w='full'>
    <SearchBar />
  </Flex>
)

const Header = () => (
  <chakra.header
    w='100vw'
    pos='fixed'
    top='0'
    left='0'
    right='0'
    zIndex='sticky'
    bgColor='purple.100'
  >
    <HeaderContent />
  </chakra.header>
)

export default Header
