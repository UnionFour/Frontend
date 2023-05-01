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
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: any;
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

export type Mutation = {
  __typename?: 'Mutation';
  accessToken: Scalars['String'];
  sendSmsCode: AuthPayload;
};


export type MutationAccessTokenArgs = {
  input: TokenInput;
};


export type MutationSendSmsCodeArgs = {
  phone: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export type TokenInput = {
  encryptedCode: Scalars['String'];
  phone: Scalars['String'];
  smsCode: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
};

export type SendSmsCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type SendSmsCodeMutation = { __typename?: 'Mutation', sendSmsCode: { __typename?: 'AuthPayload', timeSpan: any, expiry: any, encryptedCode: string } };


export const SendSmsCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendSmsCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendSmsCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"StringValue","value":"79991232323","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeSpan"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"encryptedCode"}}]}}]}}]} as unknown as DocumentNode<SendSmsCodeMutation, SendSmsCodeMutationVariables>;