import * as Types from '../../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFoodNutritionMutationVariables = Types.Exact<{
  input: Types.UpdateFoodNutritionInput;
}>;


export type UpdateFoodNutritionMutation = { __typename?: 'Mutation', updateFoodNutrition: { __typename?: 'ExistingFood', food: string, calcium?: number | null, protein?: number | null } };


export const UpdateFoodNutritionDocument = gql`
    mutation UpdateFoodNutrition($input: UpdateFoodNutritionInput!) {
  updateFoodNutrition(input: $input) {
    food
    calcium
    protein
  }
}
    `;
export type UpdateFoodNutritionMutationFn = Apollo.MutationFunction<UpdateFoodNutritionMutation, UpdateFoodNutritionMutationVariables>;

/**
 * __useUpdateFoodNutritionMutation__
 *
 * To run a mutation, you first call `useUpdateFoodNutritionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFoodNutritionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFoodNutritionMutation, { data, loading, error }] = useUpdateFoodNutritionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFoodNutritionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFoodNutritionMutation, UpdateFoodNutritionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFoodNutritionMutation, UpdateFoodNutritionMutationVariables>(UpdateFoodNutritionDocument, options);
      }
export type UpdateFoodNutritionMutationHookResult = ReturnType<typeof useUpdateFoodNutritionMutation>;
export type UpdateFoodNutritionMutationResult = Apollo.MutationResult<UpdateFoodNutritionMutation>;
export type UpdateFoodNutritionMutationOptions = Apollo.BaseMutationOptions<UpdateFoodNutritionMutation, UpdateFoodNutritionMutationVariables>;