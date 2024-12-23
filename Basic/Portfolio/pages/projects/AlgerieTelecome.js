import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/project'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="AlgerieTelecome">
    <Container my={6}>
      <Title>
        Algerie Telecome <Badge>2023</Badge>
      </Title>
      <Paragraph>
        We participated in a hackathon organized by Phoenix_esgee club, during
        which the challenge was to propose a solution for the company Algerie
        Telecom. Our team suggested a platform designed to streamline client
        interactions, aiming to save their time and enhance the company-client
        relationship.
      </Paragraph>
      <Paragraph>
        The platform features a tickets section where users can track their
        current tickets, an FAQ section for common queries, and a feedback
        section for users to share their thoughts on the service. Additionally,
        we introduced a new products section to showcase the company's
        offerings.
      </Paragraph>
      <Paragraph>
        Our goal was to create a platform that facilitates client communication,
        saves time, and fosters better relations between the company and its
        clients. The project was developed by a team of five individuals over
        the course of eight hours.
      </Paragraph>
      <List ml={4} my={4}>
        {/* <ListItem>
          <Meta>Live Stream :</Meta>
          <Link href="https://hakathon-gamma.vercel.app/" target='_black'>
            link
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem> */}
        <ListItem>
          <Meta>Github Repo : </Meta>
          <Link href="https://github.com/imadbenmadi/Hakathon-" target="_black">
            https://github.com/imadbenmadi/Hakathon-
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Coded by :</Meta>
          <span>Reactjs, ReactRouter, TaillwinddCss , Django , SqlLite</span>
        </ListItem>
      </List>

      <WorkImage
        src="/images/projects/AlgerieTelecome.png"
        alt="AlergieTelecom"
      />
      <WorkImage
        src="/images/projects/AlgerieTelecome2.png"
        alt="AlergieTelecom"
      />
      <WorkImage
        src="/images/projects/AlgerieTelecome3.png"
        alt="AlergieTelecom"
      />
    </Container>
  </Layout>
)

export default Project
