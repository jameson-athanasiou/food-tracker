import * as Types from '../../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddOrUpdateFoodEntryMutationVariables = Types.Exact<{
  input: Types.AddOrUpdateFoodEntryInput;
}>;


export type AddOrUpdateFoodEntryMutation = { __typename?: 'Mutation', addOrUpdateFoodEntry: { __typename?: 'AddOrUpdateFoodEntryResponse', entries: Array<{ __typename?: 'FoodEntry', id: string, food: string, servings: number }> } };


export const AddOrUpdateFoodEntryDocument = gql`
    mutation AddOrUpdateFoodEntry($input: AddOrUpdateFoodEntryInput!) {
  addOrUpdateFoodEntry(input: $input) {
    entries {
      id
      food
      servings
    }
  }
}
    `;
export type AddOrUpdateFoodEntryMutationFn = Apollo.MutationFunction<AddOrUpdateFoodEntryMutation, AddOrUpdateFoodEntryMutationVariables>;

/**
 * __useAddOrUpdateFoodEntryMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateFoodEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateFoodEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateFoodEntryMutation, { data, loading, error }] = useAddOrUpdateFoodEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOrUpdateFoodEntryMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateFoodEntryMutation, AddOrUpdateFoodEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateFoodEntryMutation, AddOrUpdateFoodEntryMutationVariables>(AddOrUpdateFoodEntryDocument, options);
      }
export type AddOrUpdateFoodEntryMutationHookResult = ReturnType<typeof useAddOrUpdateFoodEntryMutation>;
export type AddOrUpdateFoodEntryMutationResult = Apollo.MutationResult<AddOrUpdateFoodEntryMutation>;
export type AddOrUpdateFoodEntryMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateFoodEntryMutation, AddOrUpdateFoodEntryMutationVariables>;