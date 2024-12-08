import { mergeResolvers } from '@graphql-tools/merge'
import foodItem from './foodItem'
import foodEntry from './foodEntry'

export default mergeResolvers([foodItem, foodEntry])
