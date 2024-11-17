import * as Types from '../../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateExistingFoodEntryMutationVariables = Types.Exact<{
  input: Types.UpdateExistingFoodEntryInput;
}>;


export type UpdateExistingFoodEntryMutation = { __typename?: 'Mutation', updateExistingFoodEntry: { __typename?: 'FoodEntry', id: string, food: string, servings: number, calcium?: number | null, protein?: number | null } };


export const UpdateExistingFoodEntryDocument = gql`
    mutation UpdateExistingFoodEntry($input: UpdateExistingFoodEntryInput!) {
  updateExistingFoodEntry(input: $input) {
    id
    food
    servings
    calcium
    protein
  }
}
    `;
export type UpdateExistingFoodEntryMutationFn = Apollo.MutationFunction<UpdateExistingFoodEntryMutation, UpdateExistingFoodEntryMutationVariables>;

/**
 * __useUpdateExistingFoodEntryMutation__
 *
 * To run a mutation, you first call `useUpdateExistingFoodEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExistingFoodEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExistingFoodEntryMutation, { data, loading, error }] = useUpdateExistingFoodEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExistingFoodEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExistingFoodEntryMutation, UpdateExistingFoodEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExistingFoodEntryMutation, UpdateExistingFoodEntryMutationVariables>(UpdateExistingFoodEntryDocument, options);
      }
export type UpdateExistingFoodEntryMutationHookResult = ReturnType<typeof useUpdateExistingFoodEntryMutation>;
export type UpdateExistingFoodEntryMutationResult = Apollo.MutationResult<UpdateExistingFoodEntryMutation>;
export type UpdateExistingFoodEntryMutationOptions = Apollo.BaseMutationOptions<UpdateExistingFoodEntryMutation, UpdateExistingFoodEntryMutationVariables>;