import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddFoodEntryInput = {
  calcium?: InputMaybe<Scalars['Float']['input']>;
  date: Scalars['String']['input'];
  food: Scalars['String']['input'];
  id: Scalars['String']['input'];
  protein?: InputMaybe<Scalars['Float']['input']>;
  servings: Scalars['Float']['input'];
};

export type DeleteFoodEntryInput = {
  id: Scalars['String']['input'];
};

export type DeleteFoodEntryResponse = {
  __typename?: 'DeleteFoodEntryResponse';
  deletedId: Scalars['ID']['output'];
  success: Scalars['Boolean']['output'];
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
  addFoodEntry: FoodEntry;
  deleteFoodEntry: DeleteFoodEntryResponse;
  updateExistingFoodEntry: FoodEntry;
  updateFoodNutrition: ExistingFood;
};


export type MutationAddFoodEntryArgs = {
  input: AddFoodEntryInput;
};


export type MutationDeleteFoodEntryArgs = {
  input: DeleteFoodEntryInput;
};


export type MutationUpdateExistingFoodEntryArgs = {
  input: UpdateExistingFoodEntryInput;
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

export type UpdateExistingFoodEntryInput = {
  food?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  servings?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateFoodNutritionInput = {
  calcium?: InputMaybe<Scalars['Float']['input']>;
  food: Scalars['String']['input'];
  protein?: InputMaybe<Scalars['Float']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddFoodEntryInput: AddFoodEntryInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DeleteFoodEntryInput: DeleteFoodEntryInput;
  DeleteFoodEntryResponse: ResolverTypeWrapper<DeleteFoodEntryResponse>;
  ExistingFood: ResolverTypeWrapper<ExistingFood>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FoodEntriesByDateInput: FoodEntriesByDateInput;
  FoodEntry: ResolverTypeWrapper<FoodEntry>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateExistingFoodEntryInput: UpdateExistingFoodEntryInput;
  UpdateFoodNutritionInput: UpdateFoodNutritionInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddFoodEntryInput: AddFoodEntryInput;
  Boolean: Scalars['Boolean']['output'];
  DeleteFoodEntryInput: DeleteFoodEntryInput;
  DeleteFoodEntryResponse: DeleteFoodEntryResponse;
  ExistingFood: ExistingFood;
  Float: Scalars['Float']['output'];
  FoodEntriesByDateInput: FoodEntriesByDateInput;
  FoodEntry: FoodEntry;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  UpdateExistingFoodEntryInput: UpdateExistingFoodEntryInput;
  UpdateFoodNutritionInput: UpdateFoodNutritionInput;
};

export type DeleteFoodEntryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteFoodEntryResponse'] = ResolversParentTypes['DeleteFoodEntryResponse']> = {
  deletedId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExistingFoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExistingFood'] = ResolversParentTypes['ExistingFood']> = {
  calcium?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  food?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  protein?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FoodEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['FoodEntry'] = ResolversParentTypes['FoodEntry']> = {
  calcium?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  food?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  protein?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  servings?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFoodEntry?: Resolver<ResolversTypes['FoodEntry'], ParentType, ContextType, RequireFields<MutationAddFoodEntryArgs, 'input'>>;
  deleteFoodEntry?: Resolver<ResolversTypes['DeleteFoodEntryResponse'], ParentType, ContextType, RequireFields<MutationDeleteFoodEntryArgs, 'input'>>;
  updateExistingFoodEntry?: Resolver<ResolversTypes['FoodEntry'], ParentType, ContextType, RequireFields<MutationUpdateExistingFoodEntryArgs, 'input'>>;
  updateFoodNutrition?: Resolver<ResolversTypes['ExistingFood'], ParentType, ContextType, RequireFields<MutationUpdateFoodNutritionArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  existingFoodItems?: Resolver<Array<ResolversTypes['ExistingFood']>, ParentType, ContextType>;
  foodEntriesByDate?: Resolver<Array<ResolversTypes['FoodEntry']>, ParentType, ContextType, RequireFields<QueryFoodEntriesByDateArgs, 'input'>>;
};

export type Resolvers<ContextType = any> = {
  DeleteFoodEntryResponse?: DeleteFoodEntryResponseResolvers<ContextType>;
  ExistingFood?: ExistingFoodResolvers<ContextType>;
  FoodEntry?: FoodEntryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

