import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { useState } from 'react'
import { Container, Header, Content, Footer, Sidebar, Navbar, Stack, Toggle, CustomProvider, Nav } from 'rsuite'
import { FoodTable } from './components/FoodTable'
import { DateSelection } from './components/DateSelection'
import { AddNewFoodModal } from './components/AddNewFoodModal'
import { UpdateExistingFoodModal } from './components/UpdateExistingFoodModal'
import { DarkModeToggle } from './components/DarkModeToggle'
import 'rsuite/dist/rsuite.min.css'

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5173/graphql',
    cache: new InMemoryCache(),
  })

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)

  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US')

  const styles = `
    button {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .rs-picker-date {
      margin-top: 1rem;
    }

    .rs-stack-item {
      margin-left: 1rem;
    }

    .rs-toggle {
      margin-top: 12px;
    }
  `

  return (
    <div>
      <ApolloProvider client={client}>
        <CustomProvider theme={isDarkMode ? 'dark' : 'light'}>
          <Container>
            <Header>
              <Navbar appearance="inverse">
                <Navbar.Brand>Ellie Foods</Navbar.Brand>
                <Nav pullRight>
                  <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((prev) => !prev)} />
                </Nav>
              </Navbar>
            </Header>
            <Content>
              <style>{styles}</style>
              <Stack>
                <DateSelection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <AddNewFoodModal selectedDate={formattedSelectedDate} />
                <UpdateExistingFoodModal selectedDate={formattedSelectedDate} />
              </Stack>
              <FoodTable selectedDate={formattedSelectedDate} />
            </Content>
          </Container>
        </CustomProvider>
      </ApolloProvider>
    </div>
  )
}

export default App
