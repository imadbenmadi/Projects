import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  useColorModeValue,
  List,
  ListItem
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import StackSection from '../components/stack'
import Image from 'next/image'


const Page = () => {
  return (
    <Layout>
      <Container>
        <Box display={{ md: 'flex' }} mt={6}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Benmadi imed eddine
            </Heading>
            <p>Full Stack web developer</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor={useColorModeValue('gray.800', 'whiteAlpha.900')}
              borderWidth={2}
              borderStyle="solid"
              w="200px"
              h="200px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                src="/images/imad.jpg"
                alt="profile pic"
                width="200"
                height="200"
                priority={true}
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            About Me
          </Heading>
          <Paragraph>
            Hey there! I&apos;m Benmadi Imed-Eddine, a dedicated computer
            science graduate with plans to specialize in data science for my
            master&apos;s degree. I work as a full-stack web developer,
            leveraging technologies such as Express.js, Node.js, MySQL,
            Sequelize, MongoDb, Mongoose, and React.js and TaillwindCss to build
            robust web applications for startups, small, and large companies.
            I&apos;m always open to learning and discovering new things, and I
            enjoy facing new challenges and finding innovative ways to solve
            them.
          </Paragraph>

          <Paragraph>
            Let&apos;s chat and see how we can create something awesome
            together!
          </Paragraph>
          <Button
            variant="ghost"
            colorScheme={useColorModeValue('blue', 'red')}
          >
            <a href="mailto:benmadi.imadeedin@univ-ouargla.dz">
              benmadi.imadeedin@univ-ouargla.dz
            </a>
          </Button>
          <Box textAlign="center" my={6} ml={0}>
            <Button
              as={NextLink}
              href="/projects"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme={useColorModeValue('blue', 'red')}
            >
              My Protfolio
            </Button>
          </Box>
        </Section>

        <StackSection />

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Contact Me
          </Heading>
          <List spacing={4} fontSize="20px">
            <ListItem>
              <Link
                href="mailto:benmadi.imadeedin@univ-ouargla.dz"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme={useColorModeValue('blue', 'red')}
                  leftIcon={<MdEmail />}
                >
                  benmadi.imadeedin@univ-ouargla.dz
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://github.com/imadbenmadi" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme={useColorModeValue('blue', 'red')}
                  leftIcon={<IoLogoGithub />}
                >
                  @imadbenmadi
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.linkedin.com/in/imad-benmadi-4b5a72236/"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme={useColorModeValue('blue', 'red')}
                  leftIcon={<IoLogoLinkedin />}
                >
                  @imadbenmadi
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.instagram.com/imed.benmadi/"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme={useColorModeValue('blue', 'red')}
                  leftIcon={<IoLogoInstagram />}
                >
                  @imed.benmadi
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>

        {/* <ContactForm /> */}
      </Container>
    </Layout>
  )
}

export default Page
export { getServerSideProps } from '../components/chakra'
