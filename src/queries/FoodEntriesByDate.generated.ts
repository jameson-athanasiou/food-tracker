import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FoodEntriesByDateQueryVariables = Types.Exact<{
  input: Types.FoodEntriesByDateInput;
}>;


export type FoodEntriesByDateQuery = { __typename?: 'Query', foodEntriesByDate: Array<{ __typename?: 'FoodEntry', id: string, food: string, servings: number, calcium?: number | null, protein?: number | null }> };


export const FoodEntriesByDateDocument = gql`
    query FoodEntriesByDate($input: FoodEntriesByDateInput!) {
  foodEntriesByDate(input: $input) {
    id
    food
    servings
    calcium
    protein
  }
}
    `;

/**
 * __useFoodEntriesByDateQuery__
 *
 * To run a query within a React component, call `useFoodEntriesByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useFoodEntriesByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFoodEntriesByDateQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFoodEntriesByDateQuery(baseOptions: Apollo.QueryHookOptions<FoodEntriesByDateQuery, FoodEntriesByDateQueryVariables> & ({ variables: FoodEntriesByDateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FoodEntriesByDateQuery, FoodEntriesByDateQueryVariables>(FoodEntriesByDateDocument, options);
      }
export function useFoodEntriesByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FoodEntriesByDateQuery, FoodEntriesByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FoodEntriesByDateQuery, FoodEntriesByDateQueryVariables>(FoodEntriesByDateDocument, options);
        }
export function useFoodEntriesByDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FoodEntriesByDateQuery, FoodEntriesByDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FoodEntriesByDateQuery, FoodEntriesByDateQueryVariables>(FoodEntriesByDateDocument, options);
        }
export type FoodEntriesByDateQueryHookResult = ReturnType<typeof useFoodEntriesByDateQuery>;
export type FoodEntriesByDateLazyQueryHookResult = ReturnType<typeof useFoodEntriesByDateLazyQuery>;
export type FoodEntriesByDateSuspenseQueryHookResult = ReturnType<typeof useFoodEntriesByDateSuspenseQuery>;
export type FoodEntriesByDateQueryResult = Apollo.QueryResult<FoodEntriesByDateQuery, FoodEntriesByDateQueryVariables>;