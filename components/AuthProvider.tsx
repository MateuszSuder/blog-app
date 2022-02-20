import {useUser} from "@auth0/nextjs-auth0";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import * as Realm from "realm-web";
import {useEffect} from "react";

const AuthProvider = ({children}) => {
	const {user, isLoading} = useUser();

	const app = new Realm.App(process.env.NEXT_PUBLIC_APP_ID);

	async function getValidAccessToken() {
		// If Auth0 authenticated
		if(user) {
			if(!app.currentUser || app.currentUser.providerType === "anon-user") {
				console.log("XDDD");
				const response = await fetch('/api/auth/realm');
				return await response.text();
			} else {
				await app.currentUser.refreshCustomData();
			}
		} else {
			if (!app.currentUser) {
				await app.logIn(Realm.Credentials.anonymous());
			} else {
				// An already logged in user's access token might be stale. To guarantee that the token is
				// valid, we refresh the user's custom data which also refreshes their access token.
				await app.currentUser.refreshCustomData();
			}
		}
		return app.currentUser.accessToken
	}
	// Configure the ApolloClient to connect to your app's GraphQL endpoint
	const client = new ApolloClient({
		link: new HttpLink({
			uri: process.env.GRAPHQL_URI,
			// We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
			// The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
			// access token before sending the request.
			fetch: async (uri, options) => {
				const accessToken = await getValidAccessToken();
				options.headers['Authorization'] = `Bearer ${accessToken}`;
				return fetch(uri, options);
			},
		}),
		cache: new InMemoryCache()
	});

	useEffect(() => {
		if(!isLoading) {
			(async () => {
				console.log(await getValidAccessToken());
			})();
		}

	}, [isLoading])

	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	);
};

export default AuthProvider;