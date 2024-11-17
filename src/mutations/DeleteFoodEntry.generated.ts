import * as Types from '../../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteFoodEntryMutationVariables = Types.Exact<{
  input: Types.DeleteFoodEntryInput;
}>;


export type DeleteFoodEntryMutation = { __typename?: 'Mutation', deleteFoodEntry: { __typename?: 'DeleteFoodEntryResponse', deletedId: string, success: boolean } };


export const DeleteFoodEntryDocument = gql`
    mutation DeleteFoodEntry($input: DeleteFoodEntryInput!) {
  deleteFoodEntry(input: $input) {
    deletedId
    success
  }
}
    `;
export type DeleteFoodEntryMutationFn = Apollo.MutationFunction<DeleteFoodEntryMutation, DeleteFoodEntryMutationVariables>;

/**
 * __useDeleteFoodEntryMutation__
 *
 * To run a mutation, you first call `useDeleteFoodEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFoodEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFoodEntryMutation, { data, loading, error }] = useDeleteFoodEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFoodEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFoodEntryMutation, DeleteFoodEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFoodEntryMutation, DeleteFoodEntryMutationVariables>(DeleteFoodEntryDocument, options);
      }
export type DeleteFoodEntryMutationHookResult = ReturnType<typeof useDeleteFoodEntryMutation>;
export type DeleteFoodEntryMutationResult = Apollo.MutationResult<DeleteFoodEntryMutation>;
export type DeleteFoodEntryMutationOptions = Apollo.BaseMutationOptions<DeleteFoodEntryMutation, DeleteFoodEntryMutationVariables>;