import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/project'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="PrayingTimes">
    <Container my={6}>
      <Title>
        Praying Times<Badge>2023</Badge>
      </Title>
      <Paragraph>
        I developed this simple Praying times Website while I was learning web
        development. it helped me understant fetching essential. i used HTML,
        pure CSS, and vanilla JavaScript, I built it entirely from scratch as
        part of my learning journey.
      </Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Live Stream :</Meta>
          <Link href="https://prayer-times-nu.vercel.app/" target="_black">
            link
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Github Repo : </Meta>
          <Link
            href="https://github.com/imadbenmadi/prayer_times"
            target="_black"
          >
            https://github.com/imadbenmadi/prayer_times
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Coded by :</Meta>
          <span>HTML , CSS, JavaScript</span>
        </ListItem>
      </List>

      <WorkImage src="/images/projects/PrayingTimes.png" alt="PrayingTimes" />
      <WorkImage src="/images/projects/PrayingTimes2.png" alt="PrayingTimes" />
    </Container>
  </Layout>
)

export default Project
