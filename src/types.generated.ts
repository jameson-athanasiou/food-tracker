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

export type AddOrUpdateFoodEntryInput = {
  calcium?: InputMaybe<Scalars['Float']['input']>;
  date: Scalars['String']['input'];
  food: Scalars['String']['input'];
  id: Scalars['String']['input'];
  protein?: InputMaybe<Scalars['Float']['input']>;
  servings: Scalars['Float']['input'];
};

export type AddOrUpdateFoodEntryResponse = {
  __typename?: 'AddOrUpdateFoodEntryResponse';
  entries: Array<FoodEntry>;
};

export type ExistingFood = {
  __typename?: 'ExistingFood';
  calcium?: Maybe<Scalars['Float']['output']>;
  food: Scalars['String']['output'];
  protein?: Maybe<Scalars['Float']['output']>;
};

export type FoodEntriesByDateInput = {
  date: Scalars['String']['input'];
};

export type FoodEntry = {
  __typename?: 'FoodEntry';
  calcium?: Maybe<Scalars['Float']['output']>;
  food: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  protein?: Maybe<Scalars['Float']['output']>;
  servings: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrUpdateFoodEntry: AddOrUpdateFoodEntryResponse;
  updateFoodNutrition: ExistingFood;
};


export type MutationAddOrUpdateFoodEntryArgs = {
  input: AddOrUpdateFoodEntryInput;
};


export type MutationUpdateFoodNutritionArgs = {
  input: UpdateFoodNutritionInput;
};

export type Query = {
  __typename?: 'Query';
  existingFoodItems: Array<ExistingFood>;
  foodEntriesByDate: Array<FoodEntry>;
};


export type QueryFoodEntriesByDateArgs = {
  input: FoodEntriesByDateInput;
};

export type UpdateFoodNutritionInput = {
  calcium?: InputMaybe<Scalars['Float']['input']>;
  food: Scalars['String']['input'];
  protein?: InputMaybe<Scalars['Float']['input']>;
};
