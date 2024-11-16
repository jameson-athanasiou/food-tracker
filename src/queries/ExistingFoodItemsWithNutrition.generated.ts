import * as Types from '../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExistingFoodItemsWithNutritionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ExistingFoodItemsWithNutritionQuery = { __typename?: 'Query', existingFoodItems: Array<{ __typename?: 'ExistingFood', food: string, calcium?: number | null, protein?: number | null }> };


export const ExistingFoodItemsWithNutritionDocument = gql`
    query ExistingFoodItemsWithNutrition {
  existingFoodItems {
    food
    calcium
    protein
  }
}
    `;

/**
 * __useExistingFoodItemsWithNutritionQuery__
 *
 * To run a query within a React component, call `useExistingFoodItemsWithNutritionQuery` and pass it any options that fit your needs.
 * When your component renders, `useExistingFoodItemsWithNutritionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExistingFoodItemsWithNutritionQuery({
 *   variables: {
 *   },
 * });
 */
export function useExistingFoodItemsWithNutritionQuery(baseOptions?: Apollo.QueryHookOptions<ExistingFoodItemsWithNutritionQuery, ExistingFoodItemsWithNutritionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExistingFoodItemsWithNutritionQuery, ExistingFoodItemsWithNutritionQueryVariables>(ExistingFoodItemsWithNutritionDocument, options);
      }
export function useExistingFoodItemsWithNutritionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExistingFoodItemsWithNutritionQuery, ExistingFoodItemsWithNutritionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExistingFoodItemsWithNutritionQuery, ExistingFoodItemsWithNutritionQueryVariables>(ExistingFoodItemsWithNutritionDocument, options);
        }
export function useExistingFoodItemsWithNutritionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExistingFoodItemsWithNutritionQuery, ExistingFoodItemsWithNutritionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExistingFoodItemsWithNutritionQuery, ExistingFoodItemsWithNutritionQueryVariables>(ExistingFoodItemsWithNutritionDocument, options);
        }
export type ExistingFoodItemsWithNutritionQueryHookResult = ReturnType<typeof useExistingFoodItemsWithNutritionQuery>;
export type ExistingFoodItemsWithNutritionLazyQueryHookResult = ReturnType<typeof useExistingFoodItemsWithNutritionLazyQuery>;
export type ExistingFoodItemsWithNutritionSuspenseQueryHookResult = ReturnType<typeof useExistingFoodItemsWithNutritionSuspenseQuery>;
export type ExistingFoodItemsWithNutritionQueryResult = Apollo.QueryResult<ExistingFoodItemsWithNutritionQuery, ExistingFoodItemsWithNutritionQueryVariables>;