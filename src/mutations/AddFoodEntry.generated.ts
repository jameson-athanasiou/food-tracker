import * as Types from '../../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddFoodEntryMutationVariables = Types.Exact<{
  input: Types.AddFoodEntryInput;
}>;


export type AddFoodEntryMutation = { __typename?: 'Mutation', addFoodEntry: { __typename?: 'FoodEntry', id: string, food: string, servings: number, calcium?: number | null, protein?: number | null } };


export const AddFoodEntryDocument = gql`
    mutation AddFoodEntry($input: AddFoodEntryInput!) {
  addFoodEntry(input: $input) {
    id
    food
    servings
    calcium
    protein
  }
}
    `;
export type AddFoodEntryMutationFn = Apollo.MutationFunction<AddFoodEntryMutation, AddFoodEntryMutationVariables>;

/**
 * __useAddFoodEntryMutation__
 *
 * To run a mutation, you first call `useAddFoodEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFoodEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFoodEntryMutation, { data, loading, error }] = useAddFoodEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFoodEntryMutation(baseOptions?: Apollo.MutationHookOptions<AddFoodEntryMutation, AddFoodEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFoodEntryMutation, AddFoodEntryMutationVariables>(AddFoodEntryDocument, options);
      }
export type AddFoodEntryMutationHookResult = ReturnType<typeof useAddFoodEntryMutation>;
export type AddFoodEntryMutationResult = Apollo.MutationResult<AddFoodEntryMutation>;
export type AddFoodEntryMutationOptions = Apollo.BaseMutationOptions<AddFoodEntryMutation, AddFoodEntryMutationVariables>;