export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddFoodEntryInput = {
  date: Scalars['String']['input'];
  food: Scalars['String']['input'];
  servings: Scalars['Float']['input'];
};

export type AddFoodEntryResponse = {
  __typename?: 'AddFoodEntryResponse';
  entries: Array<FoodEntry>;
};

export type FoodEntriesByDateInput = {
  date: Scalars['String']['input'];
};

export type FoodEntry = {
  __typename?: 'FoodEntry';
  food: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  servings: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFoodEntry: AddFoodEntryResponse;
};


export type MutationAddFoodEntryArgs = {
  input: AddFoodEntryInput;
};

export type Query = {
  __typename?: 'Query';
  foodEntriesByDate: Array<FoodEntry>;
};


export type QueryFoodEntriesByDateArgs = {
  input: FoodEntriesByDateInput;
};
