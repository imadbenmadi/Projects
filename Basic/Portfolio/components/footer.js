import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box textAlign="center" opacity={0.4} fontSize="sm" mb={-4}>
      &copy; {new Date().getFullYear()} Benmadi imed eddine
    </Box>
  )
}

export default Footer
