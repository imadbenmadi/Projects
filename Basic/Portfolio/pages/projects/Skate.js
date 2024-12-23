import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/project'
import Paragraph from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="Skate">
    <Container my={6}>
      <Title>
        Skate<Badge>2024</Badge>
      </Title>
      <Paragraph>
        I've had the opportunity to develop a full-stack website for Skate
        Consult company , and we are pleased to announce the compilation of the
        first version of the platform. ✨ <br /> 🔹 Frontend: Built with React
        and Tailwind CSS for a modern, responsive, and user-friendly interface.
        <br /> 🔹 Backend: Developed using Node.js and Express, ensuring robust
        and scalable server-side operations. <br /> 🔹 Database: Utilized
        MongoDB for efficient and flexible data storage. <br /> 🔹
        Authentication: Implemented JWT authentication to secure user data and
        interactions.
        <br /> 🔹 Multi-Language Support: The platform supports both Arabic and
        English, enhancing accessibility for a diverse user base. <br /> 🔹
        Dashboard: Designed and developed a comprehensive dashboard enabling
        streamlined access to website content and efficient user management. The
        result is a secure, user-friendly platform that meets Skate Company's
        needs. I'm proud of the results we've achieved and grateful for the
        opportunity to work with Fouzia BENMADI.
      </Paragraph>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Live Stream :</Meta>
          <Link href="https://skate.dz" target="_black">
            https://skate.dz
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Coded by :</Meta>
          <span>
            Reactjs, TaillwinddCss, ReactRouter, ExpressJs, JWT Authenthication,
            MongoDB
          </span>
        </ListItem>
      </List>

      <WorkImage src="/images/projects/Skate/Skate1.png" alt="Skate" />
      <WorkImage src="/images/projects/Skate/Skate2.png" alt="Skate" />
      <WorkImage src="/images/projects/Skate/Skate3.png" alt="Skate" />
      <WorkImage src="/images/projects/Skate/Skate4.png" alt="Skate" />
      <WorkImage src="/images/projects/Skate/Skate5.png" alt="Skate" />
      <WorkImage src="/images/projects/Skate/Skate6.png" alt="Skate" />
    </Container>
  </Layout>
)

export default Project
