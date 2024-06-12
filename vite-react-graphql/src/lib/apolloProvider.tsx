import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";
import { graphUrl } from './constants'
interface ApolloProviderProps {
  children: ReactNode;
}

const client = new ApolloClient({
  uri: graphUrl,
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: ApolloProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
