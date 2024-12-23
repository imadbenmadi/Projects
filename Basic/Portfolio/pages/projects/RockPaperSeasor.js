import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/project'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="RockPaperSeasor">
    <Container my={6}>
      <Title>
        Rock Paper Seassor <Badge>2023</Badge>
      </Title>
      <Paragraph>
        I developed this simple Rock Paper Seasor game while I was learning web
        development. Using HTML, pure CSS, and vanilla JavaScript, I built it
        entirely from scratch as part of my learning journey. The game provides
        a fun and interactive way to practice essential web development skills
        and concepts.
      </Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Live Stream :</Meta>
          <Link
            href="https://rock-paper-seasor-eight.vercel.app/"
            target="_black"
          >
            link
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Github Repo : </Meta>
          <Link
            href="https://github.com/imadbenmadi/RockPaperSeasor"
            target="_black"
          >
            https://github.com/imadbenmadi/RockPaperSeasor
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Coded by :</Meta>
          <span>HTML , CSS, JavaScript</span>
        </ListItem>
      </List>

      <WorkImage
        src="/images/projects/RockPaperSeasor.png"
        alt="RockPaperSeasor"
      />
      <WorkImage
        src="/images/projects/RockPaperSeasor2.png"
        alt="RockPaperSeasor"
      />
      <WorkImage
        src="/images/projects/RockPaperSeasor3.png"
        alt="RockPaperSeasor"
      />
      <WorkImage
        src="/images/projects/RockPaperSeasor4.png"
        alt="RockPaperSeasor"
      />
      <WorkImage
        src="/images/projects/RockPaperSeasor5.png"
        alt="RockPaperSeasor"
      />
    </Container>
  </Layout>
)

export default Project
