/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: any;
  UUID: any;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  encryptedCode: Scalars['String'];
  expiry: Scalars['DateTime'];
  timeSpan: Scalars['TimeSpan'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  ingredientID: Scalars['UUID'];
  ingredientsProducts: Array<IngredientsProducts>;
  name: Scalars['String'];
  price?: Maybe<Scalars['Decimal']>;
  products: Array<Product>;
};

export type IngredientsProducts = {
  __typename?: 'IngredientsProducts';
  amount?: Maybe<Scalars['Float']>;
  amountType: Scalars['String'];
  id: Scalars['UUID'];
  ingredient?: Maybe<Ingredient>;
  ingredientID: Scalars['UUID'];
  product?: Maybe<Product>;
  productID: Scalars['UUID'];
  productName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  accessToken: Scalars['String'];
  createOrder: Order;
  sendSmsCode: AuthPayload;
  updateUser: User;
};


export type MutationAccessTokenArgs = {
  input: TokenInput;
};


export type MutationCreateOrderArgs = {
  orderDto: OrderDtoInput;
};


export type MutationSendSmsCodeArgs = {
  phone: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDtoInput;
};

export type Order = {
  __typename?: 'Order';
  address?: Maybe<Scalars['String']>;
  completingdate: Scalars['DateTime'];
  cost: Scalars['Decimal'];
  createdate: Scalars['DateTime'];
  extradition: Scalars['String'];
  orderId: Scalars['UUID'];
  ordersProducts: Array<OrdersProducts>;
  preparationdate: Scalars['DateTime'];
  products: Array<Product>;
  promocode?: Maybe<Scalars['String']>;
  user: User;
  userid: Scalars['UUID'];
};

export type OrderDtoInput = {
  address?: InputMaybe<Scalars['String']>;
  completingdate?: InputMaybe<Scalars['DateTime']>;
  cost?: InputMaybe<Scalars['Decimal']>;
  createdate?: InputMaybe<Scalars['DateTime']>;
  extradition: OrderExtradition;
  orderId?: InputMaybe<Scalars['UUID']>;
  preparationdate?: InputMaybe<Scalars['DateTime']>;
  products: Array<ProductDtoInput>;
  promocode?: InputMaybe<Scalars['String']>;
  userid: Scalars['UUID'];
};

export enum OrderExtradition {
  Delivery = 'DELIVERY',
  PickUp = 'PICK_UP'
}

export type OrdersProducts = {
  __typename?: 'OrdersProducts';
  amount?: Maybe<Scalars['Int']>;
  id: Scalars['UUID'];
  order?: Maybe<Order>;
  orderId: Scalars['UUID'];
  product?: Maybe<Product>;
  productId: Scalars['UUID'];
  productName?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  calories?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ingredients: Array<Ingredient>;
  ingredientsProducts: Array<IngredientsProducts>;
  name: Scalars['String'];
  orders: Array<Order>;
  ordersProducts: Array<OrdersProducts>;
  picture?: Maybe<Scalars['String']>;
  preparationTime: Scalars['TimeSpan'];
  price?: Maybe<Scalars['Decimal']>;
  productId: Scalars['UUID'];
  weight?: Maybe<Scalars['Float']>;
};

export type ProductDtoInput = {
  amount: Scalars['Int'];
  category?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price?: InputMaybe<Scalars['Decimal']>;
  productId: Scalars['UUID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Array<User>>;
  products?: Maybe<Array<Product>>;
  userLastOrder: Array<Product>;
};


export type QueryUserLastOrderArgs = {
  userId: Scalars['UUID'];
};

export type TokenInput = {
  encryptedCode: Scalars['String'];
  phone: Scalars['String'];
  smsCode: Scalars['String'];
};

export type UpdateUserDtoInput = {
  birth?: InputMaybe<Scalars['Date']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  birth?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  gamepoints?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
  orders: Array<Order>;
  phone: Scalars['String'];
  userid: Scalars['UUID'];
};

export type SendSmsCodeMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type SendSmsCodeMutation = { __typename?: 'Mutation', sendSmsCode: { __typename?: 'AuthPayload', timeSpan: any, expiry: any, encryptedCode: string } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserDtoInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', userid: any, name?: string | null, birth?: any | null, email?: string | null } };

export type GetAccessTokenMutationVariables = Exact<{
  input: TokenInput;
}>;


export type GetAccessTokenMutation = { __typename?: 'Mutation', accessToken: string };

export type GetLastProductsQueryVariables = Exact<{
  input: Scalars['UUID'];
}>;


export type GetLastProductsQuery = { __typename?: 'Query', userLastOrder: Array<{ __typename?: 'Product', name: string, description?: string | null, picture?: string | null, price?: any | null, category?: string | null, productId: any, ingredients: Array<{ __typename?: 'Ingredient', name: string }> }> };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', name: string, description?: string | null, picture?: string | null, price?: any | null, category?: string | null, productId: any, ingredients: Array<{ __typename?: 'Ingredient', name: string }> }> | null };

export type CreateOrderMutationVariables = Exact<{
  input: OrderDtoInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', userid: any, extradition: string, address?: string | null, cost: any, products: Array<{ __typename?: 'Product', productId: any }> } };


export const SendSmsCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendSmsCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendSmsCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeSpan"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"encryptedCode"}}]}}]}}]} as unknown as DocumentNode<SendSmsCodeMutation, SendSmsCodeMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDTOInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<GetAccessTokenMutation, GetAccessTokenMutationVariables>;
export const GetLastProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLastProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLastOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetLastProductsQuery, GetLastProductsQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDTOInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userid"}},{"kind":"Field","name":{"kind":"Name","value":"extradition"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;