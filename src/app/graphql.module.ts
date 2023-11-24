import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:5251/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
    const auth = setContext((operation, context) => {
        const token = localStorage.getItem('jwt');

        if (token === null) {
            return {};
        } else {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }
    });

    const link = ApolloLink.from([auth, httpLink.create({uri})]);
    const cache = new InMemoryCache();

    return {
        link,
        cache,
    };
}

@NgModule({
    exports: [ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
