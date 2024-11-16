import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExistingFoodNamesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ExistingFoodNamesQuery = { __typename?: 'Query', existingFoodItems: Array<{ __typename?: 'ExistingFood', food: string }> };


export const ExistingFoodNamesDocument = gql`
    query ExistingFoodNames {
  existingFoodItems {
    food
  }
}
    `;

/**
 * __useExistingFoodNamesQuery__
 *
 * To run a query within a React component, call `useExistingFoodNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExistingFoodNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExistingFoodNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExistingFoodNamesQuery(baseOptions?: Apollo.QueryHookOptions<ExistingFoodNamesQuery, ExistingFoodNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExistingFoodNamesQuery, ExistingFoodNamesQueryVariables>(ExistingFoodNamesDocument, options);
      }
export function useExistingFoodNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExistingFoodNamesQuery, ExistingFoodNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExistingFoodNamesQuery, ExistingFoodNamesQueryVariables>(ExistingFoodNamesDocument, options);
        }
export function useExistingFoodNamesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExistingFoodNamesQuery, ExistingFoodNamesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExistingFoodNamesQuery, ExistingFoodNamesQueryVariables>(ExistingFoodNamesDocument, options);
        }
export type ExistingFoodNamesQueryHookResult = ReturnType<typeof useExistingFoodNamesQuery>;
export type ExistingFoodNamesLazyQueryHookResult = ReturnType<typeof useExistingFoodNamesLazyQuery>;
export type ExistingFoodNamesSuspenseQueryHookResult = ReturnType<typeof useExistingFoodNamesSuspenseQuery>;
export type ExistingFoodNamesQueryResult = Apollo.QueryResult<ExistingFoodNamesQuery, ExistingFoodNamesQueryVariables>;