import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { useState } from 'react'
import { FoodTable } from './components/FoodTable'
import { DateSelection } from './components/DateSelection'
import { AddNewFoodModal } from './components/AddNewFoodModal'
import { UpdateExistingFoodModal } from './components/UpdateExistingFoodModal'
import 'rsuite/dist/rsuite.min.css'

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5173/graphql',
    cache: new InMemoryCache(),
  })

  const [selectedDate, setSelectedDate] = useState(new Date())

  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US')

  return (
    <>
      <ApolloProvider client={client}>
        <DateSelection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <AddNewFoodModal selectedDate={formattedSelectedDate} />
        <UpdateExistingFoodModal selectedDate={formattedSelectedDate} />
        <FoodTable selectedDate={formattedSelectedDate} />
      </ApolloProvider>
    </>
  )
}

export default App
