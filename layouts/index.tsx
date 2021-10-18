import * as React from "react"
import { Container } from "@chakra-ui/react"

import Header from "layouts/header"

interface LayoutProps {
  children: React.ReactNode
}

const Layouts = (props: LayoutProps) => {
  const { children } = props

  return (
    <Container id='content' maxW='100vw' p={0}>
      <Header />

      <Container
        as='main'
        centerContent
        maxW='100vw'
        p={0}
        minH='calc(100vh - 80px)'
        mt='10rem'
      >
        {children}
      </Container>
    </Container>
  )
}

export default Layouts
