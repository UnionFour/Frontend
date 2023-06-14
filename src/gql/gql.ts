/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n        mutation SendSmsCode($phone: String!) {\n          sendSmsCode(phone: $phone) {\n            timeSpan\n            expiry\n            encryptedCode\n          }\n        }\n      ": types.SendSmsCodeDocument,
    "\n        mutation UpdateUser($input: UpdateUserDTOInput!){\n          updateUser(updateUserDto: $input) {\n            userid\n            name\n            birth\n            email\n          }\n        }\n      ": types.UpdateUserDocument,
    "\n        mutation GetAccessToken($input: TokenInput!) {\n          accessToken(input: $input)\n        }\n      ": types.GetAccessTokenDocument,
    "\n        query GetLastProducts($input: UUID!) {\n          userLastOrder(userId: $input) {\n            name\n            description\n            picture\n            price\n            category\n            productId\n            ingredients {\n              name\n            }\n          }\n        }\n      ": types.GetLastProductsDocument,
    "\n        query GetProducts {\n          products {\n            name\n            description\n            picture\n            price\n            category\n            productId\n            ingredients {\n              name\n            }\n          }\n        }\n      ": types.GetProductsDocument,
    "\n        mutation CreateOrder($input: OrderDTOInput!) {\n          createOrder(orderDto: $input) {\n            userid\n            extradition\n            address\n            cost\n            products {\n              productId\n            }\n          }\n        }\n      ": types.CreateOrderDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation SendSmsCode($phone: String!) {\n          sendSmsCode(phone: $phone) {\n            timeSpan\n            expiry\n            encryptedCode\n          }\n        }\n      "): (typeof documents)["\n        mutation SendSmsCode($phone: String!) {\n          sendSmsCode(phone: $phone) {\n            timeSpan\n            expiry\n            encryptedCode\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation UpdateUser($input: UpdateUserDTOInput!){\n          updateUser(updateUserDto: $input) {\n            userid\n            name\n            birth\n            email\n          }\n        }\n      "): (typeof documents)["\n        mutation UpdateUser($input: UpdateUserDTOInput!){\n          updateUser(updateUserDto: $input) {\n            userid\n            name\n            birth\n            email\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation GetAccessToken($input: TokenInput!) {\n          accessToken(input: $input)\n        }\n      "): (typeof documents)["\n        mutation GetAccessToken($input: TokenInput!) {\n          accessToken(input: $input)\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query GetLastProducts($input: UUID!) {\n          userLastOrder(userId: $input) {\n            name\n            description\n            picture\n            price\n            category\n            productId\n            ingredients {\n              name\n            }\n          }\n        }\n      "): (typeof documents)["\n        query GetLastProducts($input: UUID!) {\n          userLastOrder(userId: $input) {\n            name\n            description\n            picture\n            price\n            category\n            productId\n            ingredients {\n              name\n            }\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query GetProducts {\n          products {\n            name\n            description\n            picture\n            price\n            category\n            productId\n            ingredients {\n              name\n            }\n          }\n        }\n      "): (typeof documents)["\n        query GetProducts {\n          products {\n            name\n            description\n            picture\n            price\n            category\n            productId\n            ingredients {\n              name\n            }\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation CreateOrder($input: OrderDTOInput!) {\n          createOrder(orderDto: $input) {\n            userid\n            extradition\n            address\n            cost\n            products {\n              productId\n            }\n          }\n        }\n      "): (typeof documents)["\n        mutation CreateOrder($input: OrderDTOInput!) {\n          createOrder(orderDto: $input) {\n            userid\n            extradition\n            address\n            cost\n            products {\n              productId\n            }\n          }\n        }\n      "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;