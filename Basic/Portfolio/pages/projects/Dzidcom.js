import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/project'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="Skate">
    <Container my={6}>
      <Title>
        Dzidcom<Badge>2024</Badge>
      </Title>
      <Paragraph>
        I developed a comprehensive web platform for Dzidcom, a startup designed
        to connect clients with freelancers seamlessly.
        <br /> Using React and Tailwind CSS, I crafted a modern, responsive user
        interface, incorporating various React libraries to enhance
        functionality. On the backend, I employed Node.js and Express to ensure
        robust server-side operations, alongside MySQL and Sequelize for
        efficient data management.
        <br /> This platform allows for secure and scalable communication
        between clients and freelancers, featuring user authentication, project
        tracking, and real-time notifications.
        <br /> The result is a user-friendly and efficient tool that
        significantly improves the ease of collaboration and project management
        within the freelance community.
      </Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Live Stream :</Meta>
          <Link href="https://dzidcom-front.vercel.app/" target="_black">
            Link <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Coded by :</Meta>
          <span>
            Reactjs, TaillwinddCss, ReactRouter, ExpressJs, JWT Authenthication,
            MySql and Sequelize
          </span>
        </ListItem>
      </List>

      <WorkImage src="/images/projects/Dzidcom/1.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/2.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/3.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/4.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/5.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/6.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/7.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/8.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/9.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/10.png" alt="Skate" />
      <WorkImage src="/images/projects/Dzidcom/11.png" alt="Skate" />
    </Container>
  </Layout>
)

export default Project
