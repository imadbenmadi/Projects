import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/project'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="Algerify">
    <Container my={6}>
      <Title>
        Algerify<Badge>2024</Badge>
      </Title>
      <Paragraph>
        Algerify is our thesis project, where we built an e-commerce website to
        apply all the concepts we learned during our three years of
        undergraduate studies. This project was a collaboration with my two
        colleagues. We used React and Tailwind CSS for the frontend, with my
        colleague Salah responsible for the frontend development. I developed
        the backend of the platform using Node.js and Express.js to create
        comprehensive, fast, and clean APIs to ensure HTTPS connections on the
        platform. We used MongoDB as the database.
      </Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Live Stream :</Meta>
          <Link href="https://algerify.skate.dz/" target="_black">
            link
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Backend Github Repo : </Meta>
          <Link href="https://github.com/imadbenmadi/AOS" target="_black">
            https://github.com/imadbenmadi/AOS
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Coded by :</Meta>
          <span>ExpressJs , JWT Authenthication, MongoDB</span>
        </ListItem>
      </List>

      <WorkImage src="/images/projects/AOS.png" alt="Algerify" />
      <WorkImage src="/images/projects/AOS2.png" alt="Algerify" />
    </Container>
  </Layout>
)

export default Project
