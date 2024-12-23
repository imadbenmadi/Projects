import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import { Analytics } from '@vercel/analytics/react'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Benmadi imed eddine Portfolio" />
        <meta name="author" content="Benmadi imed eddine" />
        <link rel="apple-touch-icon" href="code.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/code.png"
        ></link>
        <link rel="shortcut icon" href="/code.png" type="image/x-icon" />
        <meta property="og:site_name" content="Benmadi imad" />
        <meta name="og:title" content="Benmadi imad" />
        <meta property="og:type" content="website" />
        <title>Home - Benmadi imad</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        {children}
        <Footer />
        <Analytics />
      </Container>
    </Box>
  )
}

export default Main
