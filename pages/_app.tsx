import React from 'react';
import {getAccessToken, UserProvider} from '@auth0/nextjs-auth0';
import GraphQLProvider from "../components/GraphQLProvider";

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<GraphQLProvider>
				<Component {...pageProps} />
			</GraphQLProvider>
		</UserProvider>
	);
}
