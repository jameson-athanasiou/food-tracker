import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExistingFoodItemsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ExistingFoodItemsQuery = { __typename?: 'Query', existingFoodItems: Array<string> };


export const ExistingFoodItemsDocument = gql`
    query ExistingFoodItems {
  existingFoodItems
}
    `;

/**
 * __useExistingFoodItemsQuery__
 *
 * To run a query within a React component, call `useExistingFoodItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExistingFoodItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExistingFoodItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExistingFoodItemsQuery(baseOptions?: Apollo.QueryHookOptions<ExistingFoodItemsQuery, ExistingFoodItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExistingFoodItemsQuery, ExistingFoodItemsQueryVariables>(ExistingFoodItemsDocument, options);
      }
export function useExistingFoodItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExistingFoodItemsQuery, ExistingFoodItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExistingFoodItemsQuery, ExistingFoodItemsQueryVariables>(ExistingFoodItemsDocument, options);
        }
export function useExistingFoodItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExistingFoodItemsQuery, ExistingFoodItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExistingFoodItemsQuery, ExistingFoodItemsQueryVariables>(ExistingFoodItemsDocument, options);
        }
export type ExistingFoodItemsQueryHookResult = ReturnType<typeof useExistingFoodItemsQuery>;
export type ExistingFoodItemsLazyQueryHookResult = ReturnType<typeof useExistingFoodItemsLazyQuery>;
export type ExistingFoodItemsSuspenseQueryHookResult = ReturnType<typeof useExistingFoodItemsSuspenseQuery>;
export type ExistingFoodItemsQueryResult = Apollo.QueryResult<ExistingFoodItemsQuery, ExistingFoodItemsQueryVariables>;