import React from 'react';
import {getAccessToken, UserProvider} from '@auth0/nextjs-auth0';
import AuthProvider from "../components/AuthProvider";

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</UserProvider>
	);
}
