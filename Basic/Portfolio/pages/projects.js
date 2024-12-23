/* eslint-disable react-hooks/rules-of-hooks */
import NextLink from 'next/link'
import {
  Container,
  Heading,
  SimpleGrid,
  Divider,
  Button,
  useColorModeValue,
  Box
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import { IoLogoGithub } from 'react-icons/io5'

import thumbAOS from '../public/images/projects/AOS.png'
import thumbAlgerieTelecome from '../public/images/projects/AlgerieTelecome3.png'
import thumbSkate from '../public/images/projects/Skate2.png'
import thumbDzdicom from '../public/images/projects/Dzidcom/1.png'
import thumbInfosolutions from '../public/images/projects/Infosolutions.png'
import thumbXO from '../public/images/projects/XO.png'
import thumbRockPaperSeasor from '../public/images/projects/RockPaperSeasor.png'
import thumbPrayingTimes from '../public/images/projects/PrayingTimes.png'
import thumbPortfolio_old from '../public/images/projects/Portfolio_old.png'
const projects = () => (
  <Layout title="Portfolio">
    <Container>
      <Heading as="h3" fontSize={20} my={4}>
        Projects
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <WorkGridItem id="Dzidcom" title="Dzidcom" thumbnail={thumbDzdicom}>
          Dzidcom Platform
        </WorkGridItem>
        <WorkGridItem id="Skate" title="Skate" thumbnail={thumbSkate}>
          Skate Platform
        </WorkGridItem>
        <WorkGridItem id="AOS" title="Algerify" thumbnail={thumbAOS}>
          Algerify
        </WorkGridItem>
        <WorkGridItem
          id="InfoSolutions"
          title="InfoSolutions"
          thumbnail={thumbInfosolutions}
        >
          Info-Solutions
        </WorkGridItem>
        <WorkGridItem
          id="AlgerieTelecome"
          title="Algerie Telecome"
          thumbnail={thumbAlgerieTelecome}
        >
          Customer Service Improvement Project
        </WorkGridItem>
      </SimpleGrid>
      <Section delay={0.4}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Old projects
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.5}>
          <WorkGridItem id="XO" title="XO" thumbnail={thumbXO}>
            Simple XO Game
          </WorkGridItem>
        </Section>
        <Section delay={0.5}>
          <WorkGridItem
            id="RockPaperSeasor"
            title="Rock Paper Seasor"
            thumbnail={thumbRockPaperSeasor}
          >
            Simple Rock Paper Seasor Game
          </WorkGridItem>
        </Section>
        <Section delay={0.5}>
          <WorkGridItem
            id="PrayingTimes"
            title="Praying Times App"
            thumbnail={thumbPrayingTimes}
          ></WorkGridItem>
        </Section>
        <Section delay={0.5}>
          <WorkGridItem
            id="Portfolio_old"
            title="Old Version Of my protfolio"
            thumbnail={thumbPortfolio_old}
          ></WorkGridItem>
        </Section>
      </SimpleGrid>

      <Box textAlign="center" my={2} mb={4}>
        <Button
          as={NextLink}
          href="https://github.com/imadbenmadi"
          scroll={false}
          rightIcon={<IoLogoGithub />}
          colorScheme={useColorModeValue('blue', 'red')}
        >
          View All in GitHub
        </Button>
      </Box>
    </Container>
  </Layout>
)

export default projects
export { getServerSideProps } from '../components/chakra'
