import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { FoodTable } from './components/FoodTable'
import { DateSelection } from './components/DateSelection'
import 'rsuite/dist/rsuite.min.css'

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5173/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <>
      <ApolloProvider client={client}>
        <DateSelection />
        <FoodTable />
      </ApolloProvider>
    </>
  )
}

export default App
