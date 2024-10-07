import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/project'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="Portfolio_old">
    <Container my={6}>
      <Title>
        Praying Times<Badge>2023</Badge>
      </Title>
      <Paragraph>
        I developed this simple Portfolio while I was learning web development.
        i used HTML pure CSS, and vanilla JavaScript, I built it entirely from
        scratch as part of my learning journey.
      </Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Live Stream :</Meta>
          <Link href="https://portfolio-old-rouge.vercel.app/" target="_black">
            link
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Github Repo : </Meta>
          <Link
            href="https://github.com/imadbenmadi/Portfolio_old"
            target="_black"
          >
            https://github.com/imadbenmadi/Portfolio_old
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Coded by :</Meta>
          <span>HTML , CSS, JavaScript</span>
        </ListItem>
      </List>

      <WorkImage src="/images/projects/Portfolio_old.png" alt="PrayingTimes" />
      <WorkImage src="/images/projects/Portfolio_old2.png" alt="PrayingTimes" />
      <WorkImage src="/images/projects/Portfolio_old3.png" alt="PrayingTimes" />
      <WorkImage src="/images/projects/Portfolio_old4.png" alt="PrayingTimes" />
    </Container>
  </Layout>
)

export default Project
