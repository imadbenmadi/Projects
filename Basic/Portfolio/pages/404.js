import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  useColorModeValue
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container>
      <Heading as="h1">Not Found</Heading>
      <Text>The page you are looking for was not found.</Text>
      <Divider my={6} />
      <Box my={6} textAlign="center">
        <Button
          as={NextLink}
          href="/"
          colorScheme={useColorModeValue('blue', 'red')}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
