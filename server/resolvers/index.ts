import { merge } from 'lodash-es'
import foodItem from './foodItem'
import foodEntry from './foodEntry'

export default merge(foodItem, foodEntry)
